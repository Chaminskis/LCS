/*
 * Hospital Service
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

	var create = function(callback){
		models.Hospital.create({title:'nice'}).success(function(hospital){
			callback(hospital);
		}).error(function(error){
            callback(error);
        });
	};

	var list = function(callback){
		models.Hospital.findAll({
			include:[{
				'as':'HospitalType',
				model:models.HospitalType,
			}],
		}).success(function(result){
			
			var cleanResult = result.map(function(item){
				return removeFields(item.dataValues);
			});
			
			callback(cleanResult);
		}).error(function(error){
            callback(error);
        });
	};

	var save = function(dataModel,callback){

		models.Hospital.create({
			name:dataModel.name,
			details:dataModel.details,
			address:dataModel.address,
			hospital_type: parseInt(dataModel.hospital_type),
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
			},{
				model:models.Doctor,
				as:'Doctors',
				attributes:[ 'id','name','last','details']
			},{
				'as':'HospitalType',
				model:models.HospitalType,	
			}]
		}).success(function(result){
			
			var item = removeFields(result[0].dataValues);
			
			callback(item);
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
			
			var cleanResult = result.forEach(function(item){
				
				item.secures = item.secures.forEach(function(insurance){
					delete insurance.dataValues.hospitalSecure;
					
					removeFields(insurance);
					
					return insurance;
				});
				
				item = removeFields(item); 
				
				return item;
			});
			
			callback(result);
		}).error(function(error){
            callback(error);
        });;	
	};
	
	var addDoctor = function(hospital,doctor,callback){
		models.Hospital.find(hospital).success(function(itemHospital){
			models.Doctor.find(doctor).success(function(itemDoctor){
				
				itemHospital.addDoctor(itemDoctor)
				.success(function(result){
					callback(result);	
				}).error(function(error){
					callback(error);
				});
				
			}).error(function(error){
				callback(error);
			});
		})
		.error(function(error){
			callback(error);
		});
	};
	
		
	var removeDoctor = function(hospital,doctor,callback){
		
		var sql = 'delete from hospital_doctors where hospital_id='+ hospital +' and doctor_id= ' + doctor + ';';
		
		models.Sequelize.query(sql).success(function(result){
			callback(result);
		},function(error){
			callback(error);
		});
		
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
	
	var removeMedicalInsurance = function(hospitalID,medicalAsuranceID,callback){
		var sql = 'delete from hospital_secures where hospital_id='+ hospitalID +' and medical_secure_id= ' + medicalAsuranceID + ';';
		
		models.Sequelize.query(sql).success(function(result){
			callback(result);
		},function(error){
			callback(error);
		});
	};
	
	var listNames = function(callback){
		models.Hospital.findAll({
			attributes: ['id','name']
		}).success(function(result){
			callback(result);
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
			create(callback);
		},
		find:function(callbackResponse){
			list(callbackResponse);
		},
		findAllNames:function(callbackResponse){
			listNames(callbackResponse);
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
		},
		removeMedicalInsurance:function(hospitalId,medicalAsuranceID,callbackResponse){
			removeMedicalInsurance(hospitalId,medicalAsuranceID,callbackResponse);
		},
		addDoctor:function(hospitalId,doctorId,callbackResponse){
			addDoctor(hospitalId,doctorId,callbackResponse);
		},
		removeDoctor:function(hospitalId,doctorId,callbackResponse){
			removeDoctor(hospitalId,doctorId,callbackResponse);	
		},
	}
})();