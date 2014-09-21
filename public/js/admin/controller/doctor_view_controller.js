/*
 * DoctorView Module
 *
 */

'use strict';

angular.module('app.controllers').

controller('DoctorViewCtrl', ['$scope','$routeParams','DoctorService', function($scope,$routeParams,Doctor){

	var id = $routeParams.id;

	$scope.load = function(){
		Doctor.get(id).then(function(data){
			$scope.doctor = data.result;
		},function(error){
			window.alert('Error doctor ' + error);
		});
	};

	$scope.delete = function(id){

		var answer = window.confirm('Seguro de eliminar?');

		if(answer === false){
			return;
		}

		Doctor.delete(id).then(function(result){
			window.alert('Borrado Exitoso');

			console.log(result);

			window.location = '#/doctors/';
		},function(error){
			window.alert('Error Borrando Doctor ' + error);
		});
	};
}]);