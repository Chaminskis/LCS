/*
 *
 *
 **/

var controllerBaseUrl = '/app/manage/doctor/';

var DoctorService = require('../definitions/services/doctor_service.js');

exports.install = function(framework){
	framework.route(controllerBaseUrl + "",index,['GET']);
	framework.route(controllerBaseUrl + "",save,['JSON','POST']);
	framework.route(controllerBaseUrl + "view/{id}/",view,['GET']);
	framework.route(controllerBaseUrl + "delete/{id}/",deleteDoctor,['DELETE']);
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

function view(id){
	var self = this;

	DoctorService.get(id,function(doctor){
		self.json({
			result:doctor,
		});
	});
}

function deleteDoctor(id){
	var self = this;

	DoctorService.delete(id,function(result){
		self.json({'result':result});
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