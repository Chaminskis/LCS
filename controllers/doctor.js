/*
 *
 *
 **/

var utils = require('../definitions/utils_service.js');
var controllerBaseUrl = '/app/manage/doctor/';

var DoctorService = require('../definitions/services/doctor_service.js');

exports.install = function(framework){
	framework.route(controllerBaseUrl + "",index,['GET','authorize']);
	framework.route(controllerBaseUrl + "",save,['JSON','POST','authorize']);
	framework.route(controllerBaseUrl + 'exclude/hospital/{{ id }}',excludeHospital,['GET','authorize']);
	
	framework.route(controllerBaseUrl + "view/{id}/",view,['GET','authorize']);
	framework.route(controllerBaseUrl + "delete/{id}/",deleteDoctor,['DELETE','authorize']);
}

function index(){

	var self = this;

	DoctorService.find(function(result){
		self.json(utils.genericResponse(false,"",result));
	});
}

function excludeHospital(hospitalId){
	var self = this;
	
	DoctorService.doctorsHasNotHospital(hospitalId,function(result){
		self.json(utils.genericResponse(false,"",result));
	});
}

function view(id){
	var self = this;

	DoctorService.get(id,function(result){
		self.json(utils.genericResponse(false,"",result));
	});
}

function deleteDoctor(id){
	var self = this;

	DoctorService.delete(id,function(result){
		self.json(utils.genericResponse(false,"",result));
	});
}

function save(){

	var data = this.post;
	var self = this;

	DoctorService.create(data,function(result){
		self.json(utils.genericResponse(false,"",result));
	});
}