/*
 * grunt-npmcopy
 *
 * Copyright (c) 2014 Timmy Willison
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
	// Load all npm grunt tasks
	require('load-grunt-tasks')(grunt);

	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js',
				'<%= nodeunit.tests %>'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},

		jscs: {
			options: {
				config: '.jscsrc'
			},
			files: {
				src: ['<%= jshint.all %>']
			}
		},

		jsonlint: {
			all: [
				'*.json'
			]
		},

		// Configuration to be run (and then tested)
		npmcopy: {
			options: {
				report: true
			},
			default_options: {
				files: {
					'tmp/js/libs/lodash.js': 'lodash/dist/lodash.js',
					'tmp/js/libs/lodash.compat.js': 'lodash/dist/lodash.compat.js'
				}
			},
			prefix_options: {
				options: {
					srcPrefix: 'node_modules/jquery',
					destPrefix: 'tmp/js/jquery'
				},
				src: 'dist'
			},
			process: {
				options: {
					destPrefix: 'tmp/js/libs',
					copyOptions: {
						process: function(content) {
							return content.replace('/core', '/core-custom');
						}
					}
				},
				files: {
					'jquery.ui.datepicker.js': 'jquery-ui/datepicker.js'
				}
			},
			glob: {
				options: {
					destPrefix: 'tmp/js/plugins'
				},
				// When using glob for source files,
				// the destination will always be used as a FOLDER
				// in which to place the matching files
				src: 'jquery.panzoom/dist/*.js'
			},
			dest_folder: {
				src: 'lodash/dist/lodash.js',
				dest: 'tmp/js/libs/lodash_folder'
			},
			// Main pragma
			main: {
				src: 'jquery.onoff:main',
				dest: 'tmp/js/plugins/'
			}
		},

		// Before generating any new files, remove any previously-created files
		clean: {
			tests: [
				'tmp'
			]
		},

		// Unit tests
		nodeunit: {
			tests: ['test/*_test.js']
		},

		// Development watch task
		watch: {
			dev: {
				files: [
					'<%= jshint.all %>'
				],
				tasks: ['default']
			},
			json: {
				files: [
					'<%= jsonlint.all %>'
				],
				tasks: ['jsonlint']
			}
		}
	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// Whenever the "test" task is run, first clean the "tmp" dir, then run this
	// plugin's task(s), then test the result.
	grunt.registerTask('test', ['clean', 'npmcopy', 'nodeunit']);

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'jscs', 'jsonlint', 'test']);
};
