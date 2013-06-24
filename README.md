# [connect-rest-test](https://github.com/imrefazekas/connect-rest-test) is a simple plugin to run rest-api calls

## Getting Started

To be in harmony with the [connect-rest](https://github.com/imrefazekas/connect-rest) middleware...

This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install connect-rest-test --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('connect-rest-test');
```



## Connect-rest-test task
_Run this task with the `grunt connect_rest_test` command._

Task 'all' target and options have to be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.


This plugins allows you to specify test REST calls to check whether the RESTful services you defined (either in separated command or either in grunt test cases) are working properly. It is basically a configurable HTTP client where you can specify the method, headers, payload to be sent and compose some expectations (response time, payload, headers, etc.) regarding the response retrieved.



### Usage examples

#### Configuration



In this example, `grunt nodeunit:all` or `grunt nodeunit` will test all files ending with `_test.js` in the `test` directory.

```js
grunt.initConfig({
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
						"#content-type": "text/html; charset=UTF-8", // header vagy parameter
						//"payload": { "title": "Alice in wonderland!" },
						"statusCode": 200,
						"responseTimeLimit": "7500"
					}
				}
			}
		}
	}
});
```

Inside options, you can define as many test calls as you want. All of them will be executed asynchronously.


## Release History

* 24.06.2013   v0.1.0   First release.
