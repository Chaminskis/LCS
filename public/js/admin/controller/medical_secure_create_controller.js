/*
 *
 *
 **/

'use strict';

angular.module('app.controllers')

.controller('MedicalSecureCreateCtrl', ['$scope','MedicalSecureService', function($scope,MedicalSecure){
	
	$scope.model = {};
	
	$scope.save = function(){
	    MedicalSecure.save($scope.model).then(function(result){
	        window.alert("Seguro medico creado");
	        
	        window.location = "#/medical_secure/";
	    },function(error){
	        alert("Error " + error);
	    });
	};
	
}]);

