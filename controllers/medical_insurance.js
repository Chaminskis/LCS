/*
 *
 *
 **/

var utils = require('../definitions/utils_service.js');
var MedicalSecure = require('../definitions/services/medical_insurance_service.js');

var controllerBaseUrl = '/app/manage/medical_insurance/';

exports.install = function(framework){
	
	framework.route(controllerBaseUrl + '{{quantity}}/',index,['GET']);
	framework.route(controllerBaseUrl + '',index,['GET']);
	framework.route(controllerBaseUrl + 'exclude/hospital/{{ id }}',excludeHospital,['GET']);
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

function excludeHospital(hospitalID){
	var self = this;
	
	MedicalSecure.secureHasNotHospital(hospitalID,function(result){
	
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
	
	console.log(model);

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


