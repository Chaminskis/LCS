/*
 *
 *
 **/

'use strict';

angular.module('app.controllers')

.controller('home',['$scope',function($scope){
	$scope.message = 'nice from controller';
}]);