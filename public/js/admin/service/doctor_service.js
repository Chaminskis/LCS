/*
 *
 *
 **/

'use strict';

angular.module('app.services')

.service('DoctorService', ['$http','$q', function($http,$q){
 	
 	var baseUrlApi = "/app/manage/doctor";
	var def = $q;

	var list = function(){
		return $http({
			url:baseUrlApi,
		}).then(function(data){
			return data.data;
		},function(data){
			def.reject(data);
		});		
	};

	var get = function(id){
		return $http({
			url:baseUrlApi + 'view/' + id
		}).then(function(data){
			return data.data;
		},function(error){	
			def.reject(error);
		});
	};

	var save = function(model){

		var dataToSend = {
			name:model.name,
			last:model.last,
			details:model.details,
		};

		return $http({
			url:baseUrlApi,
			data:dataToSend,
			method:'POST',
		}).then(function(data){
			console.log('Save data');
			console.log(data);
			return data;
		},function(data){
			def.reject(data);
		});
	};

	var deleteMethod = function(id){
		return $http({
			url:baseUrlApi + 'delete/'+id,
			method:'DELETE'
		}).then(function(result){
			return result.data;
		},function(error){
			def.reject(error);
		});
	};

	return {
		save:save,
		list:list,
		get:get,
		delete:deleteMethod,
	};

}]);