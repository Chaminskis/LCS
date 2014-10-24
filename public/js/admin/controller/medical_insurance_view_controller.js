/*
 *
 *
 **/

'use strict';

angular.module('app.controllers')

.controller('MedicalInsuranceViewCtrl', ['$scope','$routeParams','MedicalInsuranceService', function($scope,$routeParams,MedicalSecure){
	
	var id = $routeParams.id;
	
	$scope.load = function(){
	    MedicalSecure.get(id).then(function(item){
	        $scope.model = item;
	    },function(error){
	        alert('Error ' + error);
	    });
	};
	
	$scope.delete = function(id){
	    
	    var answ = window.confirm("Seguro de Eliminar seguro medico?");
	    
	    if(answ === false){
	        return;
	    }
	    
	    MedicalSecure.delete(id).then(function(){
	        alert('Seguro meidoc eliminado');
	        
	        window.location = '#/medical_secure/';
	    },function(error){
	        alert('Error ' + error);
	    });
	};
	
}]);