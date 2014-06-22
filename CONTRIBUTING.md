# Contributing to grunt-npmcopy

Follow the [jQuery style guide](http://contribute.jquery.org/style-guide/js/), with these exceptions:

- Use single quotes
- Multiple var statements can be used to group variable declarations logically
- Liberal spacing between parenthesis need not be used
- Use [jsdoc-style](http://usejsdoc.org/#JSDoc3_Tag_Dictionary) comments for functions

Add tests to test/npmcopy_test.js. See the [nodeunit README](https://github.com/caolan/nodeunit) for documentation.

If you're unfamiliar with grunt, [gruntjs.com](http://gruntjs.com/) is a good place to start. Follow instructions for installing grunt and see the Gruntfile for the tasks used.

Always run tests before submitting a pull request, unless it is just a documentation or copy change.

### Development workflow

There is a watch task defined in the Gruntfile to lint and test as you go. Run `grunt watch` to start.
