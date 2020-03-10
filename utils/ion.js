const ion = require("ion-js");
const {
	Decimal,
} = ion;

const JSBI = require('./jsbi');

Decimal.toFraction = function (decimal) {
	decimal = decimal.trim();
	const numerator = decimal.getCoefficient();
	const denominator = JSBI.BigInt(Math.pow(10, Math.abs(decimal.getExponent())));

	return [numerator, denominator];
}

Decimal.prototype.toString = function () {
	const coefficient = this.getCoefficient().toString();
	const exponent = Math.abs(this.getExponent());
	let arr = new Array(coefficient.length <= exponent + 1 ? exponent + 1 : coefficient.length).fill("0");
	coefficient.split('').reverse().forEach((el, i) => {
		arr[i] = el;
	})

	arr = arr.reverse();
	if (exponent == 0) return `${arr.join('')}.`;
	else return `${arr.slice(0, -exponent).join('')}.${arr.slice(-exponent).join('')}`.replace(/0+$/, '');
}

Decimal.prototype.toJSON = function () {
	return this.toString();
}

Decimal.prototype.trim = function () {
	return new Decimal(this.toString());
}

Decimal.matchExponents = function (decimals = []) {
	let matchExponent = 0;
	let matchedDecimals = [];

	for (let decimal of decimals) {
		let exponent = decimal.getExponent();
		matchExponent = Math.min(exponent, matchExponent); // Get lowest exponent
	}

	for (let decimal of decimals) {
		let exponentDifference = decimal.getExponent() - matchExponent;
		let matchedDecimal = new Decimal(JSBI.multiply(decimal.getCoefficient(), JSBI.BigInt(Math.pow(10, exponentDifference))), matchExponent);

		matchedDecimals.push(matchedDecimal);
	}

	return matchedDecimals;
}

module.exports = ion;



// Decimal.prototype.add = function (value) {
// 	const [a, b] = Decimal.matchExponents([this, new Decimal(value.toString())]);

// 	const added = new Decimal(JSBI.add(
// 		a.getCoefficient(),
// 		b.getCoefficient()
// 	), a.getExponent());

// 	return added.trim() // Clean trailing "0" from exponent
// }

// Decimal.add = function (a, b) {
// 	const exponents = Decimal.matchExponents([a, b]);
// 	a = exponents[0]; b = exponents[1];

// 	const added = new Decimal(JSBI.add(
// 		a.getCoefficient(),
// 		b.getCoefficient()
// 	), a.getExponent());

// 	return added.trim() // Clean trailing "0" from exponent
// }

// Decimal.subtract = function (a, b) {
// 	const exponents = Decimal.matchExponents([a, b]);
// 	a = exponents[0]; b = exponents[1];

// 	const subtracted = new Decimal(JSBI.subtract(
// 		a.getCoefficient(),
// 		b.getCoefficient()
// 	), a.getExponent());

// 	return subtracted.trim() // Clean trailing "0" from exponent
// }

// Decimal.multiply = function (a, b) {
// 	const exponents = Decimal.matchExponents([a, b]);
// 	a = exponents[0]; b = exponents[1];

// 	const added = new Decimal(JSBI.multiply(
// 		a.getCoefficient(),
// 		b.getCoefficient()
// 	), a.getExponent());

// 	return added.trim() // Clean trailing "0" from exponent
// }

// Decimal.divide = function (a, b) {
// 	const exponents = Decimal.matchExponents([a, b]);
// 	a = exponents[0]; b = exponents[1];

// 	const divided = new Decimal(JSBI.divide(
// 		a.getCoefficient(),
// 		b.getCoefficient()
// 	), a.getExponent());

// 	return divided.trim() // Clean trailing "0" from exponent
// }