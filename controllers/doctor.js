/*
 *
 *
 **/

var controllerBaseUrl = '/app/manage/doctor/';

var DoctorService = require('../definitions/services/doctor_service.js');

exports.install = function(framework){
	framework.route(controllerBaseUrl + "",index,['GET']);
	framework.route(controllerBaseUrl + "",save,['JSON','POST']);
}

function index(){

	var self = this;

	DoctorService.find(function(result){
		self.json({
			'controller':'doctor :)',
			'result':result
		});
	});
}

function save(){

	var data = this.post;
	var self = this;

	DoctorService.create(data,function(result){
		self.json({
			'controller':'doctor :)',
			'action':'save',
			'result':result
		});
	});
}