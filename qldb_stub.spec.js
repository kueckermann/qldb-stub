const nearley = require('nearley');
const grammar = require('./partiql');
const { expect } = require('chai');
const { inspect } = require('util');
const QLDB = require('./qldb_stub');

describe('qldb_stub.js', () => {
	it.only('should work', () => {
		const qldb = new QLDB({
			Table1: {}
		});

		qldb.execute(`
		SELECT *
		FROM Table1 t
		`)
	});
});