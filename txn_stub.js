const sinon = require('sinon');
const ID_LENGTH = 22;
const { randomBytes } = require('crypto');
const { TransactionExecutor, Result } = require("amazon-qldb-driver-nodejs");
const ResultStub = sinon.createStubInstance(Result);
const txn = sinon.createStubInstance(TransactionExecutor);
const { jsonToIonReader, ionWriterToReader, ionWriterToJson } = require('../jsion');
const db = {};

const { Parser } = require('node-sql-parser');
const parser = new Parser();

txn.executeInline.callsFake(async (query, parameters) => {

	const [statement, args] = query.split(/\s+/g);
	switch (statement.toUpperCase()) {
		case "INSERT":
			var table = getTable(args[1]);

			const inserts = [];
			for (let writer of parameters) {
				const id = randomBytes(ID_LENGTH / 2).toString('hex');
				table[id] = ionWriterToJson(writer);

				inserts.push(jsonToIonReader({
					documentId: id
				}));
			}

			result = sinon.createStubInstance(Result);
			result.getResultList.callsFake(() => inserts);
			return result;
		case "UPDATE":
			const ast = parser.astify(query); 
			
			break;
		case "DELETE":

			break;
	}
});

function getTable(table) {
	return db[table] = db[table] || {};
}

module.exports = {
	txn,
	db
}
