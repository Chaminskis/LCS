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
			alert('Error' + error);
		});
		
		setupMap();
	};
	
	var setupMap = function(){
		alert('set up');
		var mapOptions = {
            zoom: 15,
            center: new google.maps.LatLng(18.0000, -68.0000),
            mapTypeId: google.maps.MapTypeId.ROADMAP,
        };
        
        $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);
	}

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