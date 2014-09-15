/*
 *
 *
 **/

var controllerBaseUrl = '/app/manage/medical_secure/';

var MedicalSecure = require('../definitions/services/medical_secure_service.js');

exports.install = function(framework){
	framework.route(controllerBaseUrl + '',index,['GET']);
	framework.route(controllerBaseUrl + '',save,['JSON','POST']);	

	framework.route(controllerBaseUrl + 'view/{{ id }}',index,['GET']);
	framework.route(controllerBaseUrl + 'delete/{{ id }}',remove,['DELETE']);
}

function index(){
	var self = this;

	MedicalSecure.find(function(result){
		self.json({
			'controller':'medical secure :)',
			'result':result
		});
	});
}


function view(id){
	var self = this;

	MedicalSecure.get(id,function(item){
		self.json({
			'result':item,
			'controller':'Medical secure View :) '
		});
	});
}

function save(){
	var self = this;

	var model = self.post;

	MedicalSecure.save(model,function(result){
		self.json({
			'result':result,
			'controller':'save medical secure :)',
		})
	});
}

function remove(id){
	var self = this;

	MedicalSecure.remove(id,function(result){
		self.json({
			'result':result,
			'controller':'Delte medical secure',
		});
	});
}


