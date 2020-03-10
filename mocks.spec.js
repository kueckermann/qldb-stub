const { expect } = require('chai');
const { txn, db } = require('./txn_stub');
const { ionReaderToJson, jsonToIonWriter } = require('./utils/jsion');

describe('mocks.js', () => {
	it('should insert', async () => {
		const result = await txn.executeInline(`INSERT INTO Test VALUE ? ?`, [
			jsonToIonWriter({ fakeData: true }), jsonToIonWriter({ fakeData: true }),
		]);

		const results = result.getResultList().map(result => ionReaderToJson(result));
		expect(results).to.be.an('array').of.length(2);
		expect(results[0]).to.have.key('documentId');
		expect(results[1]).to.have.key('documentId');

		expect(db.Test[results[0].documentId]).to.deep.equal({ fakeData: true });
		expect(db.Test[results[1].documentId]).to.deep.equal({ fakeData: true });
	});

	it.only('should update', async () => {
		const insertResult = await txn.executeInline(`INSERT INTO Test VALUE ?`, [
			jsonToIonWriter({ fakeData: true }), jsonToIonWriter({ fakeData: true }),
		]);

		const insertResults = insertResult.getResultList().map(result => ionReaderToJson(result));
		const id = insertResults[0].documentId;

		const result = await txn.executeInline(`UPDATE Test AS w BY _id SET w = ? WHERE _id = '${id}'`, [
			jsonToIonWriter({ fakeData: true, updated: true })
		]);

	})
});