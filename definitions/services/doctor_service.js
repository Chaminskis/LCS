/*
 *
 *
 **/

var database = require('../database.js');

module.exports = (function(context){

	/** Private context **/

	var models = require('../models.js');
	
	var dateTimeFields = ['updated_at','created_at','deleted_at'];
	
	var removeFields = function(entity){
		
		dateTimeFields.forEach(function(field){
			delete entity[field];
		});
		
		return entity;
	};
	
	var createDoctor = function(dataModel,callback){
		models.Doctor.create({
			name:dataModel.name,
			last:dataModel.last,
			details:dataModel.details
		}).success(function(doctor){
			callback({result:doctor});
		}).error(function(error){
            callback(error);
        });
	};

	var listDoctors = function(callback){
		models.Doctor.findAll().success(function(result){
			callback(result);
		}).error(function(error){
            callback(error);
        });
	};

	var getOne = function(id,callback){
		models.Doctor.find(id).success(function(doctor){
			callback(doctor);
		}).error(function(error){
            callback(error);
        });
	};

	var deleteDoctor = function(doctorId,callback){
		models.Doctor.destroy({
			id:doctorId
		}).success(function(result){
			callback(result);
		}).error(function(error){
            callback(error);
        });
	};
	
	var excludeHospitalRelation = function(hospitalId,callback){
		var sql = 'select * from doctors where id not in ( select doctor_id from hospital_doctors where hospital_id = '+ hospitalId +');';
		
		models.Sequelize.query(sql,models.MedicalSecure)
		.success(function(result){
			
			var cleanResult = result.map(function(item){
				return removeFields(item.dataValues);	
			})
			
			callback(cleanResult);
		}).error(function(error){
			callback(error);
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
		doctorsHasNotHospital:function(hospitalId,callbackResponse){
			excludeHospitalRelation(hospitalId,callbackResponse);
		}
	};

})(database);