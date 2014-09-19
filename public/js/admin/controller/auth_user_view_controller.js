/*
 *
 *
 **/

 'use strict';

 angular.module('app.controllers')

 .controller('AuthUserView', ['$scope','$routeParams','UserService',function($scope,$routeParams,User){
 	
 	var id = $routeParams.id;
 	
    $scope.data = null;
    
    $scope.load = function(){

        User.get(id)
        .then(function(data){
           $scope.model = data;
        },function(error){
            alert(error);
        });
    };
    
    $scope.delete = function(id){
        
        var ans = window.confirm('Seguro de eliminar este usuario?');
        
        if(ans === false){
            return;
        }
        
        User.remove(id)
        .then(function(){
            alert('Usuario Eliminado');
            
            window.location = '#/auth/users/';
        },function(error){
            alert(error);
        });
    };

 }]);
