/**
 * Extend v3.0.0
 * https://github.com/alexspirgel/extend
 */

const extend = (...arguments) => {

	let target = arguments[0];
	let argumentIndex, merge, mergeIsArray;
	for (argumentIndex = 1; argumentIndex < arguments.length; argumentIndex++) {
		merge = arguments[argumentIndex];
		if (merge === target) {
			continue;
		}
		mergeIsArray = Array.isArray(merge);
		if (mergeIsArray || extend.isPlainObject(merge)) {
			if (mergeIsArray && !Array.isArray(target)) {
				target = [];
			}
			else if (!mergeIsArray && !extend.isPlainObject(target)) {
				target = {};
			}
			for (const property in merge) {
				if (property === "__proto__") {
					continue;
				}
				target[property] = extend(target[property], merge[property]);
			}
		}
		else {
			if (merge !== undefined) {
				target = merge;
			}
		}
	}

	return target;

};

extend.isPlainObject = (object) => {
	const baseObject = {};
	const toString = baseObject.toString;
	const hasOwnProperty = baseObject.hasOwnProperty;
	const functionToString = hasOwnProperty.toString;
	const objectFunctionString = functionToString.call(Object);
	if (toString.call(object) !== '[object Object]') {
		return false;
	}
	const prototype = Object.getPrototypeOf(object);
	if (prototype) {
		if (hasOwnProperty.call(prototype, 'constructor')) {
			if (typeof prototype.constructor === 'function') {
				if (functionToString.call(prototype.constructor) !== objectFunctionString) {
					return false;
				}
			}
		}
	}
	return true;
};

if (typeof module !== 'undefined' && module.exports) {
	module.exports = extend;
}