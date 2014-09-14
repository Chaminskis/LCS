/*
 *
 *
 **/

'use strict';

angular.module('app.services',[])

.service('Doctor', ['$http', function($http,$q){
 	
	var def = $q;

	var list = function(){
		return $http({
			url:'/app/manage/doctor/',
		}).then(function(data){
			console.log('Result nice doctors');
			console.log(data);
			return data.data;
		},function(data){
			console.log('Result Error');
			def.reject(data);
		});		
	};

	var save = function(model){

		var dataToSend = {
			name:model.name,
			last:model.last,
			details:model.details,
		};

		return $http({
			url:'/app/manage/doctor/',
			data:dataToSend,
			type:'POST',
		}).then(function(data){
			console.log('Save data');
			console.log(data);
			return data;
		},function(data){
			def.reject(data);
		});
	};

	return {
		save:save,
		list:list,
	};

}]);