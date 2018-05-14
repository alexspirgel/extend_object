# Extend
Extends an object with vanilla JavaScript.

This function has no dependencies and works with IE 9+ and all other modern browsers.

## Parameters:

**target_object**

An object that will receive new properties and/or values from the `merge_objects`.

**merge_objects**

An object, or an array of objects, containing additional properties to merge in.

**deep**

Set to `true` for nested object structure and values to be preserved. This parameter is optional.

## Examples:

### Extend `object1` with `object2`
```js
extend(object1, object2);
```
`object2` will be merged into `object1`.

### Extend `object1` with an array of objects
```js
extend(object1, [object2, object3, object4, ...]);
```
Extending with multiple objects extends them in the order of the array.
In the example above, `object1` values would be overridden by `object2` values, then both `object1` and `object2` values would be overridden by `object3` values, etc..

### Extend objects into a new object
```js
var new_object = extend({}, [object1, object2]);
```
`new_object` will contain the values from `object1`, overridden by `object2`. Neither of the original objects will be changed,

## Notes:
* Arrays will be replaced, not merged like non-array objects, even with the `deep` argument set to `true`.

## Known Issues:
* Missing NaN specific variable handling.

## Changelog
### Version 1.2.0
* Changed `index.html` to a simple usage example.
* Added `testing.html` to check intended functionality

### Version 1.1.0
* Added better handling for `null` variables.
* Added clearer comments.

### Version 1.0.0
* Script creation.
