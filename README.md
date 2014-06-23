# grunt-npmcopy
[![Build Status](https://travis-ci.org/timmywil/grunt-npmcopy.png?branch=master)](https://travis-ci.org/timmywil/grunt-npmcopy)

> NPM for the front-end without the cruft.

- Use NPM as your front-end package manager without making `node_modules` public.
- Position your front-end dependencies where you want them in your repository.
- Conveniently facilitates [tracking your front-end dependencies](http://addyosmani.com/blog/checking-in-front-end-dependencies/).

## Workflow

Whenever you add a new front-end dependency with NPM, add which file should be copied and where to your Gruntfile `"npmcopy"` config. Then, run `grunt npmcopy`.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-npmcopy --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-npmcopy');
```

*Note: have a look at [load-grunt-tasks](https://github.com/sindresorhus/load-grunt-tasks) so you can skip this step for all your grunt plugins.*

## The "npmcopy" task

### Overview
In your project's Gruntfile, add a section named `npmcopy` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
	npmcopy: {
		options: {
			// Task-specific options go here
		},
		your_target: {
			// Target-specific file lists and/or options go here
		}
	}
});
```

### Options

#### options.srcPrefix
Type: `String`  
Default value: '`node_modules`'

`srcPrefix` will prefix your source locations with the correct folder location.

#### options.destPrefix
Type: `String`  
Default value: `''`

`destPrefix` will be used as the prefix for destinations.

#### options.report
Type: `Boolean`  
Default value: `false`

To help ensure you didn't miss any, report any modules in your package.json that have not been configured to copy at least one file with `npmcopy`.

#### options.copyOptions
Type: `Object`  
Default value: `{}`

Options to pass to `grunt.file.copy` when copying the files. See [grunt.file.copy](http://gruntjs.com/api/grunt.file#grunt.file.copy)

### Usage Examples

```js
grunt.initConfig({
	npmcopy: {
		// Anything can be copied
		test: {
			options: {
				destPrefix: 'test/js'
			},
			files: {
				// Keys are destinations (prefixed with `options.destPrefix`)
				// Values are sources (prefixed with `options.srcPrefix`); One source per destination
				// e.g. 'node_modules/chai/lib/chai.js' will be copied to 'test/js/libs/chai.js'
				'libs/chai.js': 'chai/lib/chai.js',
				'mocha/mocha.js': 'libs/mocha/mocha.js',
				'mocha/mocha.css': 'libs/mocha/mocha.css'
			}
		},
		// Javascript
		libs: {
			options: {
				destPrefix: 'public/js/libs'
			},
			files: {
				'jquery.js': 'jquery/jquery.js',
				'require.js': 'requirejs/require.js'
			},
		},
		plugins: {
			options: {
				destPrefix: 'public/js/plugins'
			},
			files: {
				// Make dependencies follow your naming conventions
				'jquery.chosen.js': 'chosen/public/chosen.js'
			}
		},
		// Less
		less: {
			options: {
				destPrefix: 'less'
			},
			files: {
				// If either the src or the dest is not present,
				// the specified location will be used for both.
				// In other words, this will copy
				// 'npm_components/bootstrap/less/dropdowns.less' to 'less/bootstrap/less/dropdowns.less'
				// See http://gruntjs.com/configuring-tasks#files for recommended files formats
				src: 'bootstrap/less/dropdowns.less'
			}
		},
		// Images
		images: {
			options: {
				destPrefix: 'public/images'
			},
			files: {
				'account/chosen-sprite.png': 'chosen/public/chosen-sprite.png',
				'account/chosen-sprite@2x.png': 'chosen/public/chosen-sprite@2x.png'
			}
		},
		// Entire folders
		folders: {
			files: {
				// Note: when copying folders, the destination (key) will be used as the location for the folder
				'public/js/libs/lodash': 'lodash',
				// The destination can also be a folder
				// Note: if the basename of the location does not have a period('.'),
				// it is assumed that you'd like a folder to be created if none exists
				// and the source filename will be used
				'public/js/libs': 'lodash/dist/lodash.js'
			}
		},
		// Glob patterns
		glob: {
			files: {
				// When using glob patterns, destinations are *always* folder names
				// into which matching files will be copied
				// Also note that subdirectories are **not** maintained
				// if a destination is specified
				// For example, one of the files copied here is
				// 'lodash/dist/lodash.js' -> 'public/js/libs/lodash/lodash.js'
				'public/js/libs/lodash': 'lodash/dist/*.js'
			}
		},
		// Glob without destination
		globSrc: {
			options: {
				destPrefix: 'public/js/libs'
			},
			// By not specifying a destination, you are denoting
			// that the lodash directory structure should be maintained
			// when copying.
			// For example, one of the files copied here is
			// 'lodash/dist/lodash.js' -> 'public/js/libs/lodash/dist/lodash.js'
			src: 'lodash/**/*.js'
		},
		// Main pragma
		// Adding :main to the end of a source path will retrieve the main file(s) for that package
		// If the main property is not specified by a package, npmcopy will fail
		main: {
			src: 'jquery.minlight:main',
			dest: 'public/js/plugins/'
		}
	}
});
```

## Contributing
Follow the same coding style present in the repo and add tests for any bug fix or feature addition.

See the [CONTRIBUTING.md](https://github.com/timmywil/grunt-npmcopy/blob/master/CONTRIBUTING.md) for more info.

## Release History

- **0.1.0** (*6-23-2014*) First Release

## License
Copyright (c) 2014 Timmy Willison. Licensed under the MIT license.
