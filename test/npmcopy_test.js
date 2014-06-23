'use strict';

var grunt = require('grunt');

/*
	======== A Handy Little Nodeunit Reference ========
	https://github.com/caolan/nodeunit

	Test methods:
		test.expect(numAssertions)
		test.done()
	Test assertions:
		test.ok(value, [message])
		test.equal(actual, expected, [message])
		test.notEqual(actual, expected, [message])
		test.deepEqual(actual, expected, [message])
		test.notDeepEqual(actual, expected, [message])
		test.strictEqual(actual, expected, [message])
		test.notStrictEqual(actual, expected, [message])
		test.throws(block, [error], [message])
		test.doesNotThrow(block, [error], [message])
		test.ifError(value)
*/

exports.npmcopy = {
	default_options: function(test) {
		test.expect(2);

		test.ok(grunt.file.exists('tmp/js/libs/lodash.js'), 'Lodash file copied to libs directory');
		test.ok(grunt.file.exists('tmp/js/libs/lodash.compat.js'), 'Lodash compat file copied to libs directory');

		test.done();
	},
	prefix_options: function(test) {
		test.expect(3);

		test.ok(grunt.file.exists('tmp/js/jquery/dist/jquery.js'), 'jQuery copied to jquery directory');
		test.ok(grunt.file.exists('tmp/js/jquery/dist/jquery.min.js'), 'jQuery min copied to jquery directory');
		test.ok(grunt.file.exists('tmp/js/jquery/dist/jquery.min.map'), 'jQuery map copied to jquery directory');

		test.done();
	},
	process: function(test) {
		test.expect(2);

		test.ok(grunt.file.exists('tmp/js/libs/jquery.ui.datepicker.js'), 'jQuery UI datepicker copied to libs directory');
		test.ok(/core\-custom/.test(grunt.file.read('tmp/js/libs/jquery.ui.datepicker.js')), 'Process function run successfully');

		test.done();
	},
	glob: function(test) {
		test.expect(2);

		test.ok(grunt.file.exists('tmp/js/plugins/jquery.panzoom/dist/jquery.panzoom.js'), 'Copy panzoom files with glob src');
		test.ok(grunt.file.exists('tmp/js/plugins/jquery.panzoom/dist/jquery.panzoom.min.js'), 'Copy panzoom files with glob src');

		test.done();
	},
	dest_folder: function(test) {
		test.expect(1);

		test.ok(grunt.file.exists('tmp/js/libs/lodash_folder/lodash.js'));

		test.done();
	},
	main: function(test) {
		test.expect(2);

		test.ok(grunt.file.exists('tmp/js/plugins/jquery.onoff.js'), 'Onoff copied to plugins directory');
		test.ok(grunt.file.exists('tmp/js/plugins/jquery.onoff.css'), 'Onoff css copied to plugins directory');

		test.done();
	}
};
