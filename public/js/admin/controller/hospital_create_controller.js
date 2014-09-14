/*
 *
 *
 **/

'use strict';

angular.module('app.controllers')

.controller('hospital_create',['$scope','Hospital', function($scope,Hospital){

	$scope.model = {};

	$scope.save = function(){
		var data = $scope.model;

		Hospital.save(data)
		.then(function(result){
			window.alert('Hospital Creado');

			window.location = '#/hospital/'
		},function(error){
			window.alert('Error '+ error);
		});
	};
}]);