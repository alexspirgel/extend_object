/**
 * Extends an object with another other object.
 *
 * @param {object} target_object The object that will receive the new properties.
 * @param {object|array} merge_objects An object or array of objects containing properties to be merged into the target object.
 * @param {boolean} [deep] If true, the merge becomes recursive (aka. deep copy).
 * @return {object} The extended target_object.
 */

var extend_object = function (target_object, merge_objects, deep) {
	'use strict';

	var extend = function (target_object, merge_object, deep) {
		for(var key in merge_object) {
			if(deep) {
				if(typeof merge_object[key] === 'object') {
					// If the property value is an array.
					if(Array.isArray(merge_object[key])) {
						// Set the target property value equal to an empty array (arrays are replaced, not merged).
						target_object[key] = [];
					}
					// If the target property is not an object.
					else if(typeof target_object[key] !== 'object') {
						// Set the target property value equal to an empty object.
						target_object[key] = {};
					}
					extend(target_object[key], merge_object[key], deep);
					// Continue to the next property (prevent copying over the entire object reference).
					continue;
				}
			}
			// If the property was not inherited.
			if(merge_object.hasOwnProperty(key)){
				target_object[key] = merge_object[key];
			}
		}

		return target_object;
	};

	// If merge_objects is not an array, make it an array.
	merge_objects = Array.isArray(merge_objects) ? merge_objects : [merge_objects];
	for(var object = 0; object < merge_objects.length; object++) {
		extend(target_object, merge_objects[object], deep);
	}

	return target_object;
};