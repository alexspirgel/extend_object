/**
 * extend v2.0.1
 * https://github.com/alexspirgel/extend
 */

/**
 * Extends an object with another object(s).
 *
 * @param {array} objects - Array of objects containing the resulting object and the objects to merge into it.
 * @param {boolean} [deep] - Optional flag to enable or disable recursive merge.
 *
 * @returns {object} The object that has been extended.
 */

const extend = (objects, deep) => {

	/**
	 * Extends an object with another object.
	 *
	 * @param {object} target_object - The target object to be merged into.
	 * @param {object} merge_object - The object to merge into the target object.
	 * @param {boolean} [deep] - Optional flag to enable or disable recursive merge.
	 *
	 * @returns {object} The object that has been extended.
	 */

	const extendObject = (target_object, merge_object, deep) => {
		// For each property in the merge_object.
		for (let property in merge_object) {
			// If the merge_object value is an object, is not null, and the deep flag is true.
			if (typeof merge_object[property] === 'object' && merge_object[property] !== null && deep) {
				// If the merge_object value is a special case.
				if (merge_object[property] instanceof Window || merge_object[property] instanceof HTMLDocument || merge_object[property] instanceof Element) {
					// Set the target_object property value equal to the merge_object property value.
					target_object[property] = merge_object[property];
					// Continue past the normal deep object handling.
					continue;
				}
				// If the merge_object value is an array.
				if (Array.isArray(merge_object[property])) {
					// Set the target_object value equal to an empty array (arrays are replaced, not merged).
					target_object[property] = [];
				}
				// If the target_object value is not an object or if it is null.
				else if (typeof target_object[property] !== 'object' || target_object[property] === null) {
					// Set the target_object value equal to an empty object.
					target_object[property] = {};
				}
				// Call the extendObject function recursively.
				extendObject(target_object[property], merge_object[property], deep);
				// Continue to the next property, skipping the normal value assignment.
				continue;
			}
			// Set the target_object property value equal to the merge_object property value (primitive values or shallow calls).
			target_object[property] = merge_object[property];
		}
		// Return the target_object.
		return target_object;
	}; // End function extendObject.

	// If objects length is greater than 1.
	if (objects.length > 1) {
		// For each object in objects (skipping the first object).
		for (let object = 1; object < objects.length; object++) {
			// If the current loop item is an object and not null.
			if (typeof objects[object] === 'object' && objects[object] !== null) {
				// Extend the first object with the current loop object.
				extendObject(objects[0], objects[object], deep);
			}
		}
	}
	// Return the first object in the array.
	return objects[0];

}; // End function extend.

// If script is being required as a node module.
if (typeof module !== 'undefined' && module.exports) {
	// Export the extend function.
	module.exports = extend;
}