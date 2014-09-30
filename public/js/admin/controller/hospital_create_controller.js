/*
 *
 *
 **/

'use strict';

angular.module('app.controllers')

.controller('HospitalCreateCtrl',['$scope','HospitalService','HospitalTypeService', function($scope,Hospital,HospitalTypeService){

	$scope.model = {};
	$scope.hospitalsTypes = [];
	
	$scope.load = function(){
		HospitalTypeService.list()
		.then(function(result){
			$scope.hospitalsTypes = result;
		},function(error){
			alert('Error' + error)
		});
	};

	$scope.$watch('hospitalsTypes',function(){
		console.log('changes',arguments);	
	});

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