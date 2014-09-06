/*
 *
 *
 **/

'use strict';

angular.module('lcs-admin',['ngRoute','lcs-admin.controller'])

.config(['$routeProvider',function($routeProvider){

	$routeProvider
		.when('/home',{
			controller:'home',
			templateUrl:'/js/admin/views/home.html'
		})

		.when('/hospital/',{
			controller:'hospital',
			templateUrl:'/js/admin/views/hospital/index.html'	
		})

		.when('/hospital/add/',{
			controller:'hospital_create',
			templateUrl:'/js/admin/views/hospital/create.html'	
		})

		.when('/medical_secure/',{
			controller:'medical_secure',
			templateUrl:'/js/admin/views/medical_secure/index.html'	
		})

		.when('/medical_secure/add/',{
			controller:'medical_secure_create',
			templateUrl:'/js/admin/views/medical_secure/create.html'	
		})		

	    .otherwise({
	    	redirectTo: '/home',
	    });
}]);