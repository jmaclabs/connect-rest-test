/*
 * grunt-connect-rest-test
 * https://github.com/imrefazekas/connect-rest-test
 *
 * Copyright (c) 2013 Imre Fazekas
 * Licensed under the MIT license.
 */

'use strict';

var httphelper = require('./http-helper');
var _ = require('underscore');

function doneCheck(done, counter){
	if( counter === 0 ){
		done();
	}
}

function checks(name, objects, expectation, log){
	if( (expectation === '$exists' && !_.has(objects, name)) ||
		(expectation === '$notexists' && _.has(objects, name)) ||
		(expectation !== '$exists' && expectation !== '$notexists' && !_.isEqual(objects[name], expectation))
	){
		log.error( new Error( name + ' fails to comply your expectation: ' + expectation) );
	}
}

function check(name, object, expectation, log){
	if( (expectation === '$exists' && !object) ||
		(expectation === '$notexists' && object) ||
		(!_.isEqual(object, expectation))
	){
		log.error( new Error( name + ' fails to comply your expectation: ' + expectation) );
	}
}

module.exports = function(grunt) {

	grunt.registerMultiTask('connect_rest_test', 'Grunt plugin for testing REST services provided by connect-rest.', function() {
		var options = this.options( );

		var done = this.async();
		var threads = 0;

		_.each( options, function(config, key, list){
			grunt.log.writeln( 'Processing job: ' + key + ' with config: ' + JSON.stringify(config) );

			if( !config.url || !config.method ){
				grunt.log.error( new Error('url and method need to be set.') );
			}

			threads++;
			var timestamp = Date.now();
			httphelper.generalCall( config.url, config.method, config.headers, null, config.payload, grunt.log,
				function(err, result, status){
					if(err){
						grunt.log.error( err );
					}
					else{
						if( config.expectation ){
							var responseTime = Date.now()-timestamp;
							if( config.expectation.responseTimeLimit && (responseTime>config.expectation.responseTimeLimit) ){
								grunt.log.error( new Error('Response received beyond the given timeframe: ' + responseTime) );
							}
							if( config.expectation.statusCode && config.expectation.statusCode !== status.statusCode ){
								grunt.log.error( new Error('Status code is not what you expected: ' + status.statusCode) );
							}

							if( config.expectation.payload ){
								check('payload', result, config.expectation.payload, grunt.log);
							}

							var specialExps = _.filter( _.keys( config.expectation ), function(exp){ return exp.substring(0,1) === '#'; } );
							_.each( specialExps, function(special, index, list){
								var specialExp = config.expectation[ special ];

								checks( special.substring(1,special.length), status.headers, specialExp, grunt.log);
							});
						}
					}

					grunt.log.writeln( 'Job finished: ' + key + ' with:' + JSON.stringify(status) );
					doneCheck(done, threads--);
				}
			);
		} );
	});

};
