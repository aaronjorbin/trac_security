/* jshint node:true */
module.exports = function(grunt) {

	// Load tasks.
	require('matchdep').filterDev('grunt-*').forEach( grunt.loadNpmTasks );

	// Project configuration.
	grunt.initConfig({
		jshint: {
			options: grunt.file.readJSON('.jshintrc'),
			grunt: {
				src: ['Gruntfile.js']
			},
			tests: {
				src: [
					'test/**/*.js',
					'!test/vendor/**/*.js'
				],
				options: grunt.file.readJSON('test/.jshintrc')
			},
			core: {
				expand: true,
				cwd: 'src',
				src: [
					'**/*.js'
				]
			}
		},
		qunit: {
			files: ['test/**/*.html']
		}
	});

	// Default task.
	grunt.registerTask('default', ['jshint', 'qunit']);

};
