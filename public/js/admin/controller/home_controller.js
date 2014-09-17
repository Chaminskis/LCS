/*
 *
 *
 **/

'use strict';

angular.module('app.controllers')

.controller('HomeCtrl',['$scope',function($scope){
	$scope.message = 'nice from controller';
}]);