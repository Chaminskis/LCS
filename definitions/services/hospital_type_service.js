/*
 * Hospital Type Service
 *
 *
 **/

module.exports = (function(){

	/** Private context **/

	var models = require('../models.js');
	
	var dateTimeFields = ['updated_at','created_at','deleted_at'];
	
	var removeFields = function(entity){
		
		dateTimeFields.forEach(function(field){
			delete entity[field];
		});
		
		return entity;
	};
	
	var list = function(callback){
		
		models.HospitalType
		.findAll()
		.success(function(result){
			
			var cleanResult = result.map(function(item){
				return removeFields(item.dataValues);
			});
			
			callback(cleanResult);
		}).error(function(error){
			callback(error);	
		});
	};
	
	return{
		find:function(callbackResponse){
			list(callbackResponse);
		}
	}
})();