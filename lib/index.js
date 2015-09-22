'use strict';

var express = require('express');
var assert = require('assert');
var check = require('core-util-is');
var handler = require('./handler');
var debuglog = require('debuglog')('pongg');

module.exports = function pongg(options) {

	var subapp;
	options = options || {};
	options.pingRoute = options.pingRoute || '/ping';
	options.pingEvent = options.pingEvent || 'start';
	options.pingPort = options.pingPort;
	options.pingHandler = options.pingHandler;

	assert.ok(check.isNumber(options.pingPort));

	subapp = express();

	subapp.get(options.pingRoute, handler({ 
		handler : options.pingHandler 
	}));

	subapp.once('mount', function onMount(parent){
		debuglog('Mounting ping route using options ' + options);

		parent.on(options.pingEvent, function(){
			debuglog('on ping event - ' + options.pingEvent);
			subapp.listen(options.pingPort, function(err){
				debuglog('Pongg subapp listening on : ' + options.pingPort);
			});
		});
	});

	return subapp;
};


module.exports.middleware = function ponggMiddleware(options) {
	options = options || {};
	//options.pingRoute = options.pingRoute || '/ping';
	options.pingHandler = options.pingHandler;

	return handler({ 
		handler : options.pingHandler 
	});
};
