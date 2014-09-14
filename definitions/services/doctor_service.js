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
			destails:dataModel.destails
		}).success(function(doctor){
			callback({});
		});

	};

	var listDoctors = function(callback){
		models.Doctor.findAll().success(function(result){
			console.log('Find all');
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
	};

})(database);