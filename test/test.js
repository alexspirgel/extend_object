const extend = require('../extend.js');

describe('isPlainObject', function () {
	describe('plain object', function () {
		it(`should return true`, function () {
			let value = {
				a: 1,
				b: 2,
				c: {
					a: 1
				}
			};
			let result = extend.isPlainObject(value);
			if (result === true) {
				return true;
			}
			throw new Error();
		});
	});
	describe('empty object', function () {
		it(`should return true`, function () {
			let value = {};
			let result = extend.isPlainObject(value);
			if (result === true) {
				return true;
			}
			throw new Error();
		});
	});
	describe('null', function () {
		it(`should return false`, function () {
			let value = null;
			let result = extend.isPlainObject(value);
			if (result === false) {
				return true;
			}
			throw new Error();
		});
	});
	describe('native object (Error class)', function () {
		it(`should return false`, function () {
			let value = Error;
			let result = extend.isPlainObject(value);
			if (result === false) {
				return true;
			}
			throw new Error();
		});
	});
	describe('undefined', function () {
		it(`should return false`, function () {
			let result = extend.isPlainObject(undefined);
			if (result === false) {
				return true;
			}
			throw new Error();
		});
	});
	describe('primitive', function () {
		it(`should return false`, function () {
			let value1 = true;
			let value2 = 5;
			let value3 = 'hello';
			let result1 = extend.isPlainObject(value1);
			let result2 = extend.isPlainObject(value2);
			let result3 = extend.isPlainObject(value3);
			if (result1 !== true && result2 !== true && result3 !== true) {
				return true;
			}
			throw new Error();
		});
	});
	describe('array', function () {
		it(`should return false`, function () {
			let value = [];
			let result = extend.isPlainObject(value);
			if (result === false) {
				return true;
			}
			throw new Error();
		});
	});
});

describe('extend', function () {
  describe('primitive, primitive', function () {
		it(`should return the second primitive`, function () {
			let value1 = 'hello';
			let value2 = 'world';
			const result = extend(value1, value2);
			if (result === 'world' &&
			value1 === 'hello' &&
			value2 === 'world') {
				return true;
			}
			throw new Error();
		});
	});
	describe('plain shallow object, plain shallow object', function () {
		it(`should return the first object with properties overridden by those present in the second object`, function () {
			let value1 = {
				a: 1,
				b: 2,
				c: 3
			};
			let value2 = {
				b: 2,
				c: 4,
				d: 5
			};
			const result = extend(value1, value2);
			if (result.a === 1 &&
				result.b === 2 &&
				result.c === 4 &&
				result.d === 5 &&
				result === value1 &&
				result !== value2) {
				return true;
			}
			throw new Error();
		});
	});
	describe('plain deep object, plain deep object', function () {
		it(`should return the first object with properties overridden by those present in the second object`, function () {
			let value1 = {
				a: 1,
				b: {
					a: 1,
					b: 2,
					c: 3
				},
				c: {
					a: 1,
					b: 2,
					c: 3
				}
			};
			let value2 = {
				b: 2,
				c: {
					b: 2,
					c: 4,
					d: 5
				},
				d: {
					b: 2,
					c: 4,
					d: 5
				}
			};
			const result = extend(value1, value2);
			if (result.a === 1 &&
				result.b === 2 &&
				result.c.a === 1 &&
				result.c.b === 2 &&
				result.c.c === 4 &&
				result.c.d === 5 &&
				result.d.b === 2 &&
				result.d.c === 4 &&
				result.d.d === 5 &&
				result === value1 &&
				result !== value2) {
				return true;
			}
			throw new Error();
		});
	});
	describe('primitive, null', function () {
		it(`should return null`, function () {
			let value1 = 'hello';
			let value2 = null;
			const result = extend(value1, value2);
			if (result === null &&
			value1 === 'hello' &&
			value2 === null) {
				return true;
			}
			throw new Error();
		});
	});
	describe('primitive, undefined', function () {
		it(`should return the first value, undefined should not be merged`, function () {
			let value1 = 'hello';
			let value2;
			const result = extend(value1, value2);
			if (result === 'hello' &&
			value1 === 'hello' &&
			value2 === undefined) {
				return true;
			}
			throw new Error();
		});
	});
});
