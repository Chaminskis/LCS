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

		console.log('Data to save');
		console.log(dataModel);

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
		models.Hospital.find(id).success(function(item){
			callback({result:item});
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
		}
	}
})();