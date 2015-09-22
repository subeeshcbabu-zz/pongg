var express = require('express'),
	pongg = require('../index'),
	request = require('supertest');

describe('Test the pong for express app', function() {
	
	var myapp = express();
	before(function(done){
		
		myapp.use(pongg({
			pingPort : 8001
		}));

		myapp.listen('8000', function(){
			console.log("===> app listening on 8000");
			myapp.emit('start');
			done();
		});	
	});

	after(function(done){
		//myapp.close();
		done();
	});

	it('ping once', function(done){

		done();
	});
});
