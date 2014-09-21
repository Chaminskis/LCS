/*
 *
 *
 **/

var utils = require('../definitions/utils_service.js');
var MedicalSecure = require('../definitions/services/medical_secure_service.js');

var controllerBaseUrl = '/app/manage/medical_secure/';

exports.install = function(framework){
	framework.route(controllerBaseUrl + '',index,['GET']);
	framework.route(controllerBaseUrl + '',save,['JSON','POST']);	

	framework.route(controllerBaseUrl + 'view/{{ id }}',view,['GET']);
	framework.route(controllerBaseUrl + 'delete/{{ id }}',remove,['DELETE']);
}

function index(){
	var self = this;

	MedicalSecure.find(function(result){
		self.json(utils.genericResponse(false,"",result));
	});
}


function view(id){
	var self = this;

	MedicalSecure.get(id,function(item){
		self.json(utils.genericResponse(false,"",item));
	});
}

function save(){
	var self = this;

	var model = self.post;

	MedicalSecure.save(model,function(result){
		self.json(utils.genericResponse(false,"",result));
	});
}

function remove(id){
	var self = this;

	MedicalSecure.remove(id,function(result){
		self.json(utils.genericResponse(false,"",result));
	});
}


