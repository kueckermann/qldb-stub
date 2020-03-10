const { createQldbWriter } = require("amazon-qldb-driver-nodejs");

const {
	Decimal,
	IonTypes,
	Timestamp,
	makeReader,
} = require("./ion");

const JSBI = require('./jsbi');

function ionReaderToJson(ionReader) {
	if (!ionReader) return;

	function recursiveParse(ionReader) {
		const type = ionReader.type();

		if (type === IonTypes.LIST) {
			const list = [];
			ionReader.stepIn();

			while (ionReader.next() != null) {
				list.push(recursiveParse(ionReader));
			}

			ionReader.stepOut();
			return list;
		} else if (type === IonTypes.STRUCT) {
			const struct = {};
			ionReader.stepIn(); // Step into the list.

			while (ionReader.next() != null) {
				const fieldName = ionReader.fieldName();
				const value = recursiveParse(ionReader);
				struct[fieldName] = value;
			}

			ionReader.stepOut();
			return struct;
		} else if (type) {
			let value = ionReader.value();
			// return value;
			if (typeof value == 'object' && value !== null) {
				switch (value.constructor.name) {
					case "Timestamp":
						value = value.getDate();
						break;
					// case "Decimal":
					// 	value = value.numberValue();
					// 	break;
					// case "JSBI":
					// 	value = value.constructor.toNumber(value);
					// 	break;
				}
			}
			return value;
		} else {
			return undefined;
		}
	}

	if (ionReader.depth() === 0) ionReader.next();
	const value = recursiveParse(ionReader);
	return value;
}

function jsonToIonWriter(value) {
	const ionWriter = createQldbWriter();

	function recursiveParse(value) {
		switch (typeof value) {
			case "string":
				ionWriter.writeString(value);
				break;
			case "boolean":
				ionWriter.writeBoolean(value);
				break;
			case "number":
				if (Number.isInteger(value)) {
					ionWriter.writeInt(value);
				} else if (isFinite(value)) {
					ionWriter.writeDecimal(Decimal.parse(value.toString()));
				}
				break;
			case "object":
				if (value instanceof Date) {
					ionWriter.writeTimestamp(Timestamp.parse(value.toISOString()));
				} else if (value instanceof Timestamp) {
					ionWriter.writeTimestamp(value);
				} else if (value instanceof Decimal) {
					ionWriter.writeDecimal(value);
				} else if (value instanceof JSBI) {
					ionWriter.writeInt(value);
				} else if (value === null) {
					ionWriter.writeNull(IonTypes.NULL);
				} else if (Array.isArray(value)) {
					// Array
					ionWriter.stepIn(IonTypes.LIST);

					for (const element of value) {
						recursiveParse(element);
					}

					ionWriter.stepOut();
				} else if (value instanceof Object) {
					// Object
					ionWriter.stepIn(IonTypes.STRUCT);

					for (const key of Object.keys(value)) {
						ionWriter.writeFieldName(key);
						recursiveParse(value[key]);
					}
					ionWriter.stepOut();
				} else {
					console.warn(`Cannot convert to Ion for type: ${(typeof value)}.`);
				}
				break;
			default:
				console.warn(`Cannot convert to Ion for type: ${(typeof value)}.`);
		}
	}

	recursiveParse(value);

	ionWriter.close();

	return ionWriter;
}

function jsonToIonReader(value) {
	return ionWriterToReader(jsonToIonWriter(value));
}

function ionWriterToReader(ionWriter) {
	return makeReader(ionWriter.getBytes())
}

function ionWriterToJson(ionWriter) {
	return ionReaderToJson(ionWriterToReader(ionWriter));
}

module.exports = {
	ionReaderToJson,
	jsonToIonWriter,
	jsonToIonReader,
	ionWriterToJson,
	ionWriterToReader
}