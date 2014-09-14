/*
 *
 *
 **/

 'use strict';

 angular.module('app.controllers')

 .controller('HospitalViewCtrl', ['$scope','$routeParams',Hospital, function($scope,$routeParams,Hospital){
 	
	var id = $routeParams.id;

 	$scope.message = 'nice from hospital view';

 	Hospital

 }]);