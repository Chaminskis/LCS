/*
 *
 *
 **/

var database = require('../database.js');

module.exports = (function(context){

	/** Private context **/

	var models = require('../models.js');

	var createDoctor = function(dataModel,callback){

		models.Doctor.create({
			name:dataModel.name,
			last:dataModel.last,
			details:dataModel.details
		}).success(function(doctor){
			callback({result:doctor});
		});
	};

	var listDoctors = function(callback){
		models.Doctor.findAll().success(function(result){
			callback(result);
		});
	};

	var getOne = function(id,callback){
		models.Doctor.find(id).success(function(doctor){
			callback(doctor);
		});
	};

	var deleteDoctor = function(doctorId,callback){
		models.Doctor.destroy({
			id:doctorId
		}).success(function(result){
			callback(result);
		});
	};

	return{
		create:function(dataModel,callbackResponse){
			createDoctor(dataModel,callbackResponse);
		},
		find:function(callbackResponse){
			listDoctors(callbackResponse);
		},
		get:function(id,callbackResponse){
			getOne(id,callbackResponse);
		},
		delete:function(id,callbackResponse){
			deleteDoctor(id,callbackResponse);
		},
	};

})(database);