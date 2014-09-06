/*
 * Hospital Service
 *
 *
 **/

this.dataBase = require('../database.js');

module.exports = (function(context){

	/** Private context **/

	var models = require('../models.js');

	var create = function(callback){

		models.Hospital.create({title:'nice'}).success(function(hospital){
			console.log('Model saved');

			hospital.destroy().success(function() {
				console.log('Lo borro igual');    
				callback(hospital);
			});
		});

		console.log('Creaste method');
	}

	return {

		/*
 		 *
 		 *
 		 **/
		hi:function(callback){
			console.log('nice billt');
			create(callback)
		}
	}
})(this);