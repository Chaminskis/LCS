/*
 *
 *
 **/

 'use strict';

angular.module('app.controllers')

.controller('HospitalViewCtrl', ['$scope','$routeParams','HospitalService', function($scope,$routeParams,Hospital){
    
    var id = $routeParams.id;

    $scope.message = 'nice from hospital view';

    $scope.load = function(){
        Hospital.get(id)
        .then(function(data){
            console.log(data);
            $scope.data = data.result;
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
    }
    
    $scope.addMedicalEnsurance = function(id){
    	  alert(id.id);
    };
    
    $scope.medicalEnsurance = [];
    
    $scope.loadMedicalEnsurance = function(){
    	
    				$scope.medicalEnsurance = [];    
    	
        $scope.medicalEnsurance.push({name:"Nombre",details:"Detalles",id:1});    
        $scope.medicalEnsurance.push({name:"Nombre",details:"Detalles",id:2});    
        $scope.medicalEnsurance.push({name:"Nombre",details:"Detalles",id:3});    
        $scope.medicalEnsurance.push({name:"Nombre",details:"Detalles",id:4});    
        $scope.medicalEnsurance.push({name:"Nombre",details:"Detalles",id:5});    
        $scope.medicalEnsurance.push({name:"Nombre",details:"Detalles",id:6});    
        $scope.medicalEnsurance.push({name:"Nombre",details:"Detalles",id:7});    
        $scope.medicalEnsurance.push({name:"Nombre",details:"Detalles",id:8});    
    }
}]);