var objects_match = function (object_1, object_2) {
	if (object_1 instanceof Window && object_2 instanceof Window) {
		return true;
	}
	// Create arrays of property names
	var object_1_properties = Object.getOwnPropertyNames(object_1).sort();
	var object_2_properties = Object.getOwnPropertyNames(object_2).sort();

	// If the number of properties are not equal.
	if (object_1_properties.length !== object_2_properties.length) {
		console.warn('objects_match: The number of object properties no not match.');
		return false;
	}

	// For each property in object_1
	for(var i = 0; i < object_1_properties.length; i++) {

		var object_1_property = object_1_properties[i];
		var object_2_property = object_2_properties[i];

		// If the object_1 property does not equal the object_2 property.
		if(object_1_property !== object_2_property) {
			console.warn('objects_match: The properties of the objects do not match. (' + object_1_property + ' != ' + object_2_property + ')');
			return false;
		}

		var object_1_value = object_1[object_1_property];
		var object_2_value = object_2[object_2_property];

		// If the types of the object values do not match.
		if(typeof object_1_value !== typeof object_2_value) {
			console.warn('objects_match: The `' + object_1_property + '` value types do not match.');
			return false;
		}

		// If the values are objects.
		if(typeof object_1_value === 'object' && object_1_value !== null &&
			typeof object_2_value === 'object' && object_2_value !== null) {
			// Recursive function call.
			if(objects_match(object_1_value, object_2_value) === false) {
				return false;
			}
		}

		// If the values are functions.
		else if(typeof object_1_value === 'function' && typeof object_2_value === 'function') {
			// Skip.
		}

		// If the type of values are neither objects or functions.
		else {
			// If one value does not equal the other.
			if(object_1_value !== object_2_value) {
				console.warn('objects_match: The `' + object_1_property + '` values do not match.');
				return false;
			}
		}
	}

	// If we made it this far, the objects match.
	return true;
};

var test_object_1 = {
	'array_1': [],
	'array_2': ['a', 'b', 'c'],
	'array_3': ['d', 'e', ['f', 'g'], {'h': 'i', 'j': 'k'}],
	'boolean_1': true,
	'boolean_2': false,
	'date_1': new Date(),
	'function_1': function (abc) {return abc;},
	'number_1': 0,
	'number_2': 0.0,
	'number_3': 5,
	'number_4': 46.8,
	'number_5': -93,
	'number_6': -11.2,
	'null_1': null,
	'object_1': {},
	'object_2': {'str': 'abc', 'num': 123},
	'object_3': {
		'1a': 'a',
		'1b': {
			'2a': 2,
			'2b': function (xyz) {return 789;},
			'2c': {
				'3a': false,
				'3b': {
					'foo': null,
					'bar': [1, 2, '3']
				}
			}
		}
	},
	'string_1': '0',
	'string_2': 'string',
	'undefined_1': undefined
};

var test_object_1_duplicate = {
	'array_1': [],
	'array_2': ['a', 'b', 'c'],
	'array_3': ['d', 'e', ['f', 'g'], {'h': 'i', 'j': 'k'}],
	'boolean_1': true,
	'boolean_2': false,
	'date_1': new Date(),
	'function_1': function (abc) {return abc;},
	'number_1': 0,
	'number_2': 0.0,
	'number_3': 5,
	'number_4': 46.8,
	'number_5': -93,
	'number_6': -11.2,
	'null_1': null,
	'object_1': {},
	'object_2': {'str': 'abc', 'num': 123},
	'object_3': {
		'1a': 'a',
		'1b': {
			'2a': 2,
			'2b': function (xyz) {return 789;},
			'2c': {
				'3a': false,
				'3b': {
					'foo': null,
					'bar': [1, 2, '3']
				}
			}
		}
	},
	'string_1': '0',
	'string_2': 'string',
	'undefined_1': undefined
};

var test_object_2 = {
	'array_2': ['x', 'y', 'z'],
	'boolean_1': false,
	'boolean_2': true,
	'date_1': new Date(new Date().getTime() + (1*60*60*1000)), // Add one hour
	'date_2': new Date(new Date().getTime() + (2*60*60*1000)), // Add 2 hours
	'function_1': function (qwerty) {return qwerty;},
	'number_1': -0,
	'number_2': 3,
	'number_4': 0, 
	'number_5': 1000009,
	'object_3': {
		'1b': {
			'2c': {
				'3b': {
					'foo': 'not null'
				},
				'333': 'new property'
			}
		},
		'1c': 'new property'
	},
	'string_1': null,
	'string_2': '0',
	'string_3': 'new string',
	'undefined_1': 7
};

var test_object_2_duplicate = {
	'array_2': ['x', 'y', 'z'],
	'boolean_1': false,
	'boolean_2': true,
	'date_1': new Date(new Date().getTime() + (1*60*60*1000)), // Add one hour
	'date_2': new Date(new Date().getTime() + (2*60*60*1000)), // Add 2 hours
	'function_1': function (qwerty) {return qwerty;},
	'number_1': -0,
	'number_2': 3,
	'number_4': 0, 
	'number_5': 1000009,
	'object_3': {
		'1b': {
			'2c': {
				'3b': {
					'foo': 'not null'
				},
				'333': 'new property'
			}
		},
		'1c': 'new property'
	},
	'string_1': null,
	'string_2': '0',
	'string_3': 'new string',
	'undefined_1': 7
};

var special_case_object_1 = {
	'document': 'uhhh',
	'element': document.querySelector('body')
};
var special_case_object_2 = {
	'document': document,
	'window': window
};

var test = function () {
	var test_object_copy = function () {
		var result_object_1 = extend([{}, test_object_1]);

		if(objects_match(test_object_1, test_object_1_duplicate) &&
			objects_match(test_object_1, result_object_1)) {
			console.log('PASS test_object_copy');
		}
		else {
			console.error('FAIL test_object_copy');
		}
	};
	test_object_copy();

	var test_shallow_merge_new_object = function () {
		var result_object_2 = extend([{}, test_object_1, test_object_2]);

		var result_object_2_expected = {
			'array_1': [],
			'array_2': ['x', 'y', 'z'],
			'array_3': ['d', 'e', ['f', 'g'], {'h': 'i', 'j': 'k'}],
			'boolean_1': false,
			'boolean_2': true,
			'date_1': new Date(new Date().getTime() + (1*60*60*1000)),
			'date_2': new Date(new Date().getTime() + (2*60*60*1000)),
			'function_1': function (qwerty) {return qwerty;},
			'number_1': -0,
			'number_2': 3,
			'number_3': 5,
			'number_4': 0, 
			'number_5': 1000009,
			'number_6': -11.2,
			'null_1': null,
			'object_1': {},
			'object_2': {'str': 'abc', 'num': 123},
			'object_3': {
				'1b': {
					'2c': {
						'3b': {
							'foo': 'not null'
						},
						'333': 'new property'
					}
				},
				'1c': 'new property'
			},
			'string_1': null,
			'string_2': '0',
			'string_3': 'new string',
			'undefined_1': 7
		};

		if(objects_match(test_object_1, test_object_1_duplicate) &&
			objects_match(test_object_2, test_object_2_duplicate) &&
			objects_match(result_object_2, result_object_2_expected)) {
			console.log('PASS test_shallow_merge_new_object');
		}
		else {
			console.error('FAIL test_shallow_merge_new_object');
		}
	};
	test_shallow_merge_new_object();

	var test_deep_merge_new_object = function () {
		var result_object_3 = extend([{}, test_object_1, test_object_2], true);

		var result_object_3_expected = {
			'array_1': [],
			'array_2': ['x', 'y', 'z'],
			'array_3': ['d', 'e', ['f', 'g'], {'h': 'i', 'j': 'k'}],
			'boolean_1': false,
			'boolean_2': true,
			'date_1': new Date(new Date().getTime() + (1*60*60*1000)),
			'date_2': new Date(new Date().getTime() + (2*60*60*1000)),
			'function_1': function (qwerty) {return qwerty;},
			'number_1': -0,
			'number_2': 3,
			'number_3': 5,
			'number_4': 0, 
			'number_5': 1000009,
			'number_6': -11.2,
			'null_1': null,
			'object_1': {},
			'object_2': {'str': 'abc', 'num': 123},
			'object_3': {
				'1a': 'a',
				'1b': {
					'2a': 2,
					'2b': function (xyz) {return 789;},
					'2c': {
						'3a': false,
						'3b': {
							'foo': 'not null',
							'bar': [1, 2, '3']
						},
						'333': 'new property'
					}
				},
				'1c': 'new property'
			},
			'string_1': null,
			'string_2': '0',
			'string_3': 'new string',
			'undefined_1': 7
		};

		if(objects_match(test_object_1, test_object_1_duplicate) &&
			objects_match(test_object_2, test_object_2_duplicate) &&
			objects_match(result_object_3, result_object_3_expected)) {
			console.log('PASS test_deep_merge_new_object');
		}
		else {
			console.error('FAIL test_deep_merge_new_object');
		}
	};
	test_deep_merge_new_object();

	var test_special_cases = function () {

		var result_object_4 = extend([{}, special_case_object_1, special_case_object_2], true);

		var result_object_4_expected = {
			'document': document,
			'window': window,
			'element': document.querySelector('body')
		};

		if(objects_match(result_object_4, result_object_4_expected)) {
			console.log('PASS test_special_cases');
		}
		else {
			console.error('FAIL test_special_cases');
		}
	};
	test_special_cases();
};
test();