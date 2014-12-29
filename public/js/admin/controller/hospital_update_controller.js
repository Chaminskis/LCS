/*
 *
 *
 **/

'use strict';

angular.module('app.controllers')

.controller('HospitalUpdateCtrl',['$scope','$routeParams','HospitalService','HospitalTypeService', function($scope,$routeParams,Hospital,HospitalTypeService){
    
    var id = $routeParams.id;
    
    $scope.model = {};
    
    $scope.hospitalsTypes = [];
  
    $scope.load = function(){
        
        /** Load hospital info **/
        Hospital.get(id)
        .then(function(result){
            
            $scope.model = result;
            
            if($scope.model !== undefined){
                $scope.model.location = {};
                
                $scope.model.location.latitude = result.latitude;
                $scope.model.location.longitude = result.longitude;
            }
            
        },function(){
            alert("Hospital no encontrado");
            
            window.location = '#/hospital/';
        }); 
        
        /** Load hospital types **/
        HospitalTypeService.list()
		.then(function(result){
			$scope.hospitalsTypes = result;
		},function(error){
			alert('Error' + error);
		});
    };
    
    $scope.save = function(){
        var data = $scope.model;
		
		data.id = id;
		
		Hospital.update(data)
		.then(function(result){
			window.alert('Hospital Actualizado');

			window.location = '#/hospital/';
		},function(error){
			window.alert('Error '+ error);
		});
	};
    
}]);
