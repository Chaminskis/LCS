/*
 * Medical secure service
 *
 *
 **/

module.exports = (function(){

 	/** Private Context **/
	var models = require('../models.js');

	var save = function(model,callback){
		models.MedicalSecure
		.create({
			name:model.name,
			details:model.details,
		})
		.success(function(medicalSecure){
			callback({'result':medicalSecure});
		});
	}

	var find = function(callback){
		models.MedicalSecure.findAll().success(function(result){
			callback(result);
		});
	}

	var getOne = function(id,callback){
		models.MedicalSecure.find(id).success(function(item){
			callback(item);
		});
	}

	var remove = function(medicalSecureId,callback){
		models.MedicalSecure.destroy({
			id:medicalSecureId
		}).success(function(item){
			callback(item);
		});
	}

 	return {

 		callMama : function(){

 		},

 		save:function(dataModel,callbackResponse){
 			save(dataModel,callbackResponse);
 		},

 		find:function(callbackResponse){
 			find(callbackResponse);
 		},
 		get:function(id,callbackResponse){
 			getOne(id,callbackResponse);
 		},
 		remove:function(id,callbackResponse){
 			remove(id,callbackResponse);
 		}
 	}
})();
