/*
 *
 *
 **/

 'use strict';

angular.module('app.controllers')

.controller('HospitalViewCtrl', ['$scope','$routeParams','HospitalService','MedicalSecureService', function($scope,$routeParams,Hospital,MedicalAsurance){
    
    var id = $routeParams.id;

    $scope.message = 'nice from hospital view';
    
    $scope.medicalEnsurance = [];

    $scope.load = function(){
        Hospital.get(id)
        .then(function(result){
            console.log("Result view hospital",result);
            $scope.data = result;
        },function(error){
            window.alert('Error ' + error);
        });
    };

    $scope.delete = function(id){

        var answer = window.confirm('Seguro de eliminar este Hospital?');

        if(answer === false){
            return;
        }

        Hospital.delete(id)
        .then(function(result){
            window.alert('Eliminardo exitosamente');

            window.location = '#/hospital/';
        },function(error){
            alert('Error ' + error);
        });
    };
    
    $scope.addMedicalInsurance = function(secureID){
    	  Hospital.addMedicalInsurance(id,secureID)
    	  .then(function(result){
    	      alert("Agregado con exito");
    	  },function(error){
    	      window.alert(error);
    	  });
    };

    $scope.loadMedicalEnsurance = function(){
    	
    	MedicalAsurance.notrelatedMedicalAsurance(id)
    	.then(function(result){
    	    $scope.medicalEnsurance.push.apply($scope.medicalEnsurance,result);
    	},function(error){
    	    window.alert('Error ' + error);
    	});
    	
    };
}]);