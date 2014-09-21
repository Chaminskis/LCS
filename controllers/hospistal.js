/*
 *
 *
 **/

var utils = require('../definitions/utils_service.js');
var controllerBaseUrl = '/app/manage/hospital/';

var HospitalService = require('../definitions/services/hospital_service.js');

exports.install = function(framework){
	framework.route(controllerBaseUrl + '',index,['GET']);
	framework.route(controllerBaseUrl + '',save,['JSON','POST']);

	framework.route(controllerBaseUrl + 'view/{{ id }}',view,['GET']);
	framework.route(controllerBaseUrl + 'delete/{{ id }}',remove,['DELETE']);
}

function index(){
	var self = this;

	HospitalService.find(function(result){
		self.json(utils.genericResponse(false,'',result));
	});
}

function save(){
	var self = this;

	var data = self.post;

	HospitalService.save(data,function(result){
		self.json(utils.genericResponse(false,'',result));
	});
}

function remove(id){
	var self = this;

	HospitalService.delete(id,function(result){
		self.json(utils.genericResponse(false,'',result));
	});
}

function view(id){
	var self = this;

	HospitalService.get(id,function(result){
		self.json(utils.genericResponse(false,'',result));
	});
}