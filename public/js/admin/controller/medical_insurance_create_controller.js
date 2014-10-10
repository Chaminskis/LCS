/*
 *
 *
 **/

'use strict';

angular.module('app.controllers')

.controller('MedicalInsuranceCreateCtrl', ['$scope','MedicalInsuranceService', function($scope,MedicalSecure){
	
	$scope.model = {};
	
	$scope.save = function(){
	    MedicalSecure.save($scope.model).then(function(result){
	        window.alert("Seguro medico creado");
	        
	        window.location = "#/medical_insurance/";
	    },function(error){
	        alert("Error " + error);
	    });
	};
	
}]);

