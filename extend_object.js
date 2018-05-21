/**
 * extend_object v1.2.1
 * https://github.com/alexspirgel/extend_object
 */

/**
 * Extends an object with another other object.
 *
 * @param {object} target_object The object that will receive the new properties and values.
 * @param {object|array} merge_objects An object or array of objects to be merged into the target_object.
 * @param {boolean} [deep] If true, the extend becomes recursive (aka. deep clone).
 *
 * @return {object} The extended target_object.
 */

var extend_object = function (target_object, merge_objects, deep) {
	'use strict';

	var extend = function (target_object, merge_object, deep) {
		// For each property in the merge_object.
		for(var property in merge_object) {
			// If the merge_object value is an object, is not null, and the deep flag is true.
			if(typeof merge_object[property] === 'object' && merge_object[property] !== null && deep) {
				// If the merge_object value is an array.
				if(Array.isArray(merge_object[property])) {
					// Set the target_object value equal to an empty array (arrays are replaced, not merged).
					target_object[property] = [];
				}
				// If the target_object value is not an object or if it is null.
				else if(typeof target_object[property] !== 'object' || target_object[property] === null) {
					// Set the target_object value equal to an empty object.
					target_object[property] = {};
				}
				// Call the extend function recursively.
				extend(target_object[property], merge_object[property], deep);
				// Continue to the next property, skipping the normal value assignment.
				continue;
			}
			// Set the target_object property value equal to the merge_object property value (primitive values or shallow calls).
			target_object[property] = merge_object[property];
		}
		// Return the target_object.
		return target_object;
	};

	// If merge_objects is not an array, make it an array.
	if(!Array.isArray(merge_objects)) {
		merge_objects = [merge_objects];
	}
	// For each object in merge_objects.
	for(var object = 0; object < merge_objects.length; object++) {
		// Extend the target_object with the merge_object.
		extend(target_object, merge_objects[object], deep);
	}

	// Return the extended target_object.
	return target_object;
};