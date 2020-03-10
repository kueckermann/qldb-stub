const nearley = require('nearley');
const grammar = require('./partiql');

class QLDB {
	constructor(tables) {
		this.DB = {
			...tables
		}
	}

	execute(query, paraments) {
		const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
		parser.feed(query);

		const parsed = parser.results[0];
		const tables = this.getFilteredTables(parsed);
	}

	getFilteredTables({
		tables,
		filters
	}) {
		let filteredTables = {};

		for (let { name, alias, by } of tables) {
			let table = this.DB[name];
			if (table && alias) {
				filteredTables[name] = {
					// records: 
				}
			}
		}
	}
}


module.exports = QLDB;
