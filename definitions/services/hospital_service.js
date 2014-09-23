/*
 * Hospital Service
 *
 *
 **/

module.exports = (function(){

	/** Private context **/

	var models = require('../models.js');

	var create = function(callback){
		models.Hospital.create({title:'nice'}).success(function(hospital){
			console.log('Model saved');
			callback(hospital);
		}).error(function(error){
            callback(error);
        });

		console.log('Creaste method');
	};

	var list = function(callback){
		models.Hospital.findAll().success(function(result){
			callback(result);
		}).error(function(error){
            callback(error);
        });;
	};

	var save = function(dataModel,callback){

		models.Hospital.create({
			name:dataModel.name,
			details:dataModel.details,
			address:dataModel.address,
			latitude:dataModel.location.latitude,
			longitude:dataModel.location.longitude,
		}).success(function(hospital){
			callback({
				'result':hospital
			});
		}).error(function(error){
            callback(error);
        });
	};

	var getOne = function(id,callback){
		return models.Hospital.findAll({
			where:{ 
				id:id
			},
			include:[{
				model:models.MedicalSecure,
				as:'Secures',
				attributes:[ 'id','name','details']
			}]
		}).success(function(result){
			callback(result[0]);
		}).error(function(error){
			callback(error);
		});
	};

	var deleteMethod = function(hospitalId,callback){
		models.Hospital.destroy({
			id:hospitalId,
		}).success(function(result){
			callback({'result':result});
		}).error(function(error){
            callback(error);
        });;
	};
	
	var listAll = function(callback){
		
		models.Hospital
		.findAll({
			attributes:['id','name','details','address','latitude','longitude'],
			include:[{
				model:models.MedicalSecure,
				as:'Secures',
				attributes:[ 'id','name','details']
			}]	
		})
		.success(function(result){
			callback(result);
		}).error(function(error){
            callback(error);
        });;	
	};
	
	var addmedicalInsurance = function(hospital,secure,callback){
		
		models.Hospital.find(hospital).success(function(itemHospital){
			
			models.MedicalSecure.find(secure).success(function(itemSecure){
			
				itemHospital.addSecure(itemSecure)
				.success(function(result){
					callback(result);
				}).error(function(error){
					callback(error);
				});
				
			}).error(function(error){
				callback(error);
			});
			
		}).error(function(error){
			callback(error);
		});
	};

	return {

		/*
 		 *
 		 *
 		 **/
		hi:function(callback){
			console.log('nice billt');
			create(callback);
		},
		find:function(callbackResponse){
			list(callbackResponse);
		},
		save:function(data,callbackResponse){
			save(data,callbackResponse);
		},
		delete:function(id,callbackResponse){
			deleteMethod(id,callbackResponse);
		},
		get:function(id,callbackResponse){
			getOne(id,callbackResponse);
		},
		findAll:function(callbackResponse){
			listAll(callbackResponse);
		},
		addMedicalInsurance:function(hospital,medicalAsurance,callbackResponse){
			addmedicalInsurance(hospital,medicalAsurance,callbackResponse);
		}
	}
})();