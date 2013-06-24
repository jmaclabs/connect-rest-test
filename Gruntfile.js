/*
 * grunt-connect-rest-test
 * https://github.com/imrefazekas/connect-rest-test
 *
 * Copyright (c) 2013 Imre Fazekas
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		jshint: {
			all: [
				'Gruntfile.js',
				'tasks/*.js'
			],
			options: {
				jshintrc: '.jshintrc',
			},
		},

		// Configuration to be run (and then tested).
		connect_rest_test: {
			all: {
				options: {
					"testCall1":{
						"url": "http://444.hu",
						"method": "GET",
						"header":{},
						//"payload": {},
						"expectation": {
							"#date": "$exists",
							"#content-type": "text/html; charset=UTF-8",
							//"payload": { "title": "Alice in wonderland!" },
							"statusCode": 200,
							"responseTimeLimit": "7500"
						}
					}
				}
			}
		}

	});

	// Actually load this plugin's task(s).
	grunt.loadTasks('tasks');

	// These plugins provide necessary tasks.
	grunt.loadNpmTasks('grunt-contrib-jshint');

	// By default, lint and run all tests.
	grunt.registerTask('default', ['jshint', 'connect_rest_test']);

};
