const nearley = require('nearley');
const grammar = require('./partiql');
const { expect } = require('chai');

const { inspect } = require('util');

describe('partiql.js', () => {
	it.only('should parse select', () => {
		const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
		parser.feed(`
		SELECT *, a, b 
		FROM Table AS t BY _id
		WHERE a = 1
		AND a = '2'
		OR b = 2`);

		// console.log(inspect(parser.results, false, 100));

		expect(parser.results).to.deep.equal([{
			statement: 'SELECT',
			selectors: ['*', 'a', 'b'],
			tables: [{ name: 'Table', alias: 't', by: '_id' }],
			filters:
				[{ type: null, left: 'a', operator: '=', right: 1 },
				{ type: 'AND', left: 'a', operator: '=', right: '2' },
				{ type: 'OR', left: 'b', operator: '=', right: 2 }]
		}]);
	});

	it('should parse update', () => {
		const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammar));
		parser.feed(`
		UPDATE Table AS w BY _id 
		SET w = ?, x = 'hello', y = ''
		WHERE _id = 'id'
		`);

		// console.log(inspect(parser.results, false, 100));

		expect(parser.results).to.deep.equal([{
			statement: 'UPDATE',
			setters:
				[{ left: 'w', operator: '=', right: '$0' },
				{ left: 'x', operator: '=', right: 'hello' },
				{ left: 'y', operator: '=', right: '' }],
			tables: [{ name: 'Table', alias: 'w', by: '_id' }],
			filters: [{ type: null, left: '_id', operator: '=', right: 'id' }]
		}]);
	})
});