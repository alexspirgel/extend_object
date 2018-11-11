# extend
Extends an object with vanilla JavaScript.

## Parameters:

**target_object**

An object that will receive new properties and/or values from the `merge_objects`.

**merge_objects**

An object, or an array of objects, containing additional properties to merge in.

**deep**

Set to `true` for nested object structure and values to be preserved. This parameter is optional.

## Usage:

### Extend `object1` with `object2`
```js
extend([object1, object2]);
```
`object2` will be merged into `object1`.

### Extend `object1` with an array of objects
```js
extend([object1, object2, object3, object4, ...]);
```
Extending with multiple objects extends them in the order of the array.
In the example above, `object1` values would be overridden by `object2` values, then both `object1` and `object2` values would be overridden by `object3` values, etc...

### Extend a new object with multiple objects
```js
var new_object = extend([{}, object1, object2]);
```
`new_object` will contain the values from `object1`, overridden by `object2`. Neither of the original objects will be changed.

### Extend a new object with a single object to create a clone
```js
var clone_object = extend([{}, object1], true);
```
`clone_object` will be a clone of `object1`.

## Notes:
* NodeLists are converted to arrays.
* Arrays are replaced, not merged, even with the `deep` argument set to `true`.