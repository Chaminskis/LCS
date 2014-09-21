/*
 *
 *
 **/

'use strict';

angular.module('app.services')

.service('AuthService',['$http','$q',function($http,$q){
   
   var def = $q;
   var baseUrl = "/app/manage/auth/";
   
   var login = function(user,password){
      var model = {
        user:user,
        password:password 
      };
      
      return $http({
          url:baseUrl+"login/",
          method:"POST",
          data:model,
      }).then(function(result){
          return result.data.result;
      },function(error){
         def.reject(error);
      });
   };
   
   return {
        login:login,  
   }; 
}]);