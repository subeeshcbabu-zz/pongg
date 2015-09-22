'use strict';

var jsonHandler = function jsonHandler () {

	return function (req, res) {
		res.writeHead(200);
		res.write(JSON.stringify({
			status : 'UP'
		}));
		res.end();
	};
};

var textHandler = function jsonHandler () {

	return function (req, res) {
		res.writeHead(200);
		res.write('UP');
		res.end();
	};
};

var fileHandler = function fileHandler () {
	
};

var type = {
	json : jsonHandler,
	text : textHandler,
	file : fileHandler

};

module.exports.type = type;

module.exports = function handler(options) {

	
	options = options || {};
	options.handler = options.handler || 'text';

	return type[options.handler] || textHandler;

};