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
		}).error(function(error){
            callback(error);
        });
	};

	var find = function(){
		
		var callback = null;
		var quantity = 20;
		var args = arguments;
		
		if(args['0'] !== undefined && typeof(args['0']) === typeof(2)){
			quantity = args['0'];
			callback = args['1'];
		}else{
			callback = args[0];
		}
		
		models.MedicalSecure.findAndCountAll({
			limit:quantity,
		}).success(function(result){
			callback(result);
		}).error(function(error){
            callback(error);
        });
	};

	var getOne = function(id,callback){
		models.MedicalSecure.find(id).success(function(item){
			callback(item);
		}).error(function(error){
            callback(error);
        });;
	};

	var remove = function(medicalSecureId,callback){
		models.MedicalSecure.destroy({
			id:medicalSecureId
		}).success(function(item){
			callback(item);
		}).error(function(error){
            callback(error);
        });
	};
	
	var excludeHospitalRelation = function(hospitalID,callback){
		
		var sql = 'select * from medical_secures where id not in ( select medical_secure_id from hospital_secures where hospital_id = '+ hospitalID +');';
		
		models.Sequelize.query(sql,models.MedicalSecure)
		.success(function(result){
			callback(result);
		}).error(function(error){
			callback(error);
		});
	};

 	return {

 		callMama : function(){

 		},
 		save:function(dataModel,callbackResponse){
 			save(dataModel,callbackResponse);
 		},
 		find:function(quantity,callbackResponse){
 			find(quantity,callbackResponse);
 		},
 		get:function(id,callbackResponse){
 			getOne(id,callbackResponse);
 		},
 		remove:function(id,callbackResponse){
 			remove(id,callbackResponse);
 		},
 		secureHasNotHospital:function(hospitalID,callbackResponse){
 			excludeHospitalRelation(hospitalID,callbackResponse);
 		}
 	}
})();
