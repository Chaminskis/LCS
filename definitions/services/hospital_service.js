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
			
			if(entity.hospitalType !== undefined){
				delete entity.hospitalType.dataValues[field];
			}
			
			delete entity[field];
			
			if(entity.secures !== undefined){
				/** Remove hospital secure relation value **/
				entity.secures.forEach(function(itemSecure){
					delete itemSecure.dataValues['hospitalSecure'];
				});
			}
			
			if(entity.doctors !== undefined){
				/** Remove doctor relation object **/
				entity.doctors.forEach(function(itemDoctor){
					delete itemDoctor.dataValues['hospitalDoctor'];
				});
			}
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

	/*
	 * List all hospital just for show on table.
	 **/
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

	/*
	 * Save method
	 **/
	var save = function(dataModel,callback){

		models.Hospital.create({
			name:dataModel.name,
			details:dataModel.details,
			address:dataModel.address,
			hospital_type: parseInt(dataModel.hospital_type,10),
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

	/*
	 * View hospital 
	 *
	 **/
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
        });
	};
	
	var listAll = function(){
		
		var callback = null;
		var quantity = 10;
		var args = arguments;
		
		if(args['0'] !== undefined && typeof(args['0']) === typeof(2)){
			quantity = args['0'];
			callback = args['1'];
		}else{
			callback = args[0];
		}
		
		models.Hospital
		.findAll({
			limit:quantity,
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
			
			callback(cleanResult);
		}).error(function(error){
            callback(error);
        });	
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
	
	var searchHospital = function(searchObject,callback){
		
		// {
		// 	   searchType:'CRITERIA|LOCATION',
		//     criteria:'algo algo algo',
		//     location:{
		//         lat:34.34,
		//         lon:23.23,
		//         max_distance:10, //km based
		//     }
		//  }
		
		var queryCall = null;
		var query = {
			limit:10,
			page:1
		};
		
		if(searchObject.searchType !== undefined){
			var type = searchObject.searchType;
			if(type === "CRITERIA"){
				
				if(searchObject.criteria === undefined){
					callback("On Criteria search type Criteria value is needed :)");
					return;
				}
				
				var criterias = searchObject.criteria.split(' ');
				var where = [];
				
				for(var i=0;i<criterias.length;i++){
					where.push("hospitals.name like '%" + criterias[i] + "%' or ");
					where.push("hospitals.details like '%" + criterias[i] + "%' or ");
					where.push("hospitals.address like '%" + criterias[i] + "%' or ");
				}
				
				query.where = where.join("");
				query.where = query.where.substr(0,query.where.length - 3);
				
				queryCall= models.Hospital.findAndCountAll({
					where:[query.where],
					include:[{
						'as':'HospitalType',
						model:models.HospitalType,
					}],
				});
			}else if(type === "LOCATION"){
				
				if(searchObject.location === undefined){
					callback("On location search Type Location object is needed :)");
					return;
				}
				
				if(searchObject.location.lat === undefined || typeof(searchObject.location.lat)  !== typeof(1) || 
				searchObject.location.lon === undefined || typeof(searchObject.location.lon)  !== typeof(1)){
					callback("Both latitude and longitude are value required and need to be numbers xx.xx");
					return;
				}
				
				query.distance = searchObject.location.distance === undefined?10:searchObject.location.distance;

				query.sql = "SELECT *,count(*) as count, SQRT( "+
							    "POW(69.1 * (latitude - " + searchObject.location.lat + "), 2) + "+
    							"POW(69.1 * ("+ searchObject.location.lon +"  - longitude) * COS(latitude / 57.3), 2)) AS distance "+
    							" ,HospitalType.name as HospitalType_name " + 
    							" ,HospitalType.details as HospitalType_details " + 
    							" ,HospitalType.id as HospitalType_id " + 
								"FROM hospitals " +
								"LEFT JOIN `hospital_types` AS `HospitalType` ON `HospitalType`.`id` = `hospitals`.`hospital_type` "+
								"HAVING distance < "+ query.distance +" ORDER BY distance;";
								
				queryCall = models.Sequelize.query(query.sql,models.MedicalSecure);
			}else{
				callback("Invalid value for searchType");
				return;
			}
		}else{
			callback("Search Type not found");
			return;
		}
		
		queryCall.success(function(result){
			var cleanResult = null;
			var count = 0;
			
			if(result !== undefined && result.rows !== undefined){
				count = result.count;
				cleanResult = result.rows.map(function(item){
					return removeFields(item.dataValues);
				});
			}else{
				
				cleanResult = result.map(function(item){
					count = item.dataValues.count;	

					delete item.dataValues.count;
					
					item = removeFields(item.dataValues);
					
					//don't know how but removeFields return a single object not a entity (I'm strong)
					
					item.hospitalType = {
						id: item.HospitalType_id,
						name: item.HospitalType_name,
						details: item.HospitalType_details,
					};
					
					delete item.HospitalType_id;
					delete item.HospitalType_details;
					delete item.HospitaType_id;
					delete item.HospitalType_name;
					
					return item;
				});
			}
			
			callback({
				count:count,
				rows:cleanResult,
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
		findAll:function(quantity,callbackResponse){
			listAll(quantity,callbackResponse);
		},
		search:function(searchObject,callbackResponse){
			searchHospital(searchObject,callbackResponse);
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