/*
 *
 *
 **/
 'use strict';
 
 angular.module('app.services')
 
 .service('MedicalSecureService',['$http','$q',function($http,$q){
     
     var def = $q;
     
     var save = function(model){
         return $http({
             url:"/app/manage/medical_secure/",
             method:"POST",
             data:model,
         }).then(function(result){
             return result.data;
         },
         function(error){
             def.reject(error);
         });
     };
     
     var list = function(){
         return $http({
             url:"/app/manage/medical_secure/",
         }).then(function(result){
             return result.data.result;
         },function(error){
            def.reject(error);
         });
     };
     
     var get = function(id){
         return $http({
             url:"/app/manage/medical_secure/view/"+id
         }).then(function(result){
             return result.data.result;
         },function(error){
             def.reject(error)
         });
     };
     
     var remove = function(id){
         return $http({
             url:'/app/manage/medical_secure/delete/'+id,
             method:'DELETE',
         }).then(function(result){
             return result.data;
         },function(error){
             def.reject(error);
         });
     };
     
     return {
         save:save,
         find:list,
         get:get,
         delete:remove,
     }
 }]);