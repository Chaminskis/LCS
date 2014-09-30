/*
 *
 *
 **/

'use strict';

angular.module('app.controllers')

.controller('HospitalCreateCtrl',['$scope','HospitalService','hospitalTypes', function($scope,Hospital,hospitalTypes){

	$scope.model = {};

	alert(hospitalTypes);

	$scope.save = function(){
		var data = $scope.model;

		Hospital.save(data)
		.then(function(result){
			window.alert('Hospital Creado');

			window.location = '#/hospital/';
		},function(error){
			window.alert('Error '+ error);
		});
	};
}]);