/*
 *
 *
 **/

 'use strict';

 angular.module('app.controllers')

 .controller('AuthUser', ['$scope','User',function($scope,User){
 	
    $scope.message = 'nice from auth user';
    
    $scope.data = null;
    
    $scope.load = function(){
        User.list()
        .then(function(data){
           $scope.data = data;
        },function(error){
            alert(error);
        });
    }

 }]);


