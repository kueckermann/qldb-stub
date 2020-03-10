const JSBI = require('jsbi');
JSBI.prototype.toJSON = function () {
	return this.toString();
}
JSBI.ZERO = JSBI.BigInt(0);
JSBI.ONE = JSBI.BigInt(1);

module.exports = JSBI;