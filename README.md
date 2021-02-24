# extend
Extends a value with another value using vanilla JavaScript. Similar in functionality to the jQuery extend function.

Notes:

* This function always performs a deep copy, there is no shallow copy option. Native solutions now exist for shallow copying.
* `undefined` values will not be merged into the target.

## Installation

### Using NPM:

```js
npm install @alexspirgel/extend
```

```js
const extend = require('@alexspirgel/extend');
```

### Using a script tag:

Download the `extend.js` file from the `/dist` folder.

```html
<script src="path/to/extend.js"></script>
```

## Usage

### Extend an object with other objects
```js
extend(object1, object2, objects3);
```
`object2` and `object3` will be merged into `object1`.

### Clone an object
```js
var object2 = extend({}, object1);
```
`object2` will be a clone of `object1`.