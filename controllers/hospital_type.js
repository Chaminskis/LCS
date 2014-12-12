/*
 *
 *
 **/

var utils = require('../definitions/utils_service.js');
var controllerBaseUrl = '/app/manage/hospital_type/';

var HospitalTypeService = require('../definitions/services/hospital_type_service.js');

exports.install = function(framework){
	framework.route(controllerBaseUrl + '',index,['GET','authorize']);
}

function index(){
	var self = this;

	HospitalTypeService.find(function(result){
		self.json(utils.genericResponse(false,'',result));
	});
}