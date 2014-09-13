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

		/** Hospitals routes **/
		.when('/hospital/',{
			controller:'hospital',
			templateUrl:'/js/admin/views/hospital/index.html'	
		})

		.when('/hospital/add/',{
			controller:'hospital_create',
			templateUrl:'/js/admin/views/hospital/create.html'	
		})

		/** Medical secure routes **/
		.when('/medical_secure/',{
			controller:'medical_secure',
			templateUrl:'/js/admin/views/medical_secure/index.html'	
		})

		.when('/medical_secure/add/',{
			controller:'medical_secure_create',
			templateUrl:'/js/admin/views/medical_secure/create.html'	
		})		


		/** Doctor routes **/
		.when('/doctors/',{
			controller:'doctor',
			templateUrl:'/js/admin/views/doctor/index.html'	
		})

		.when('/doctors/add/',{
			controller:'doctor_create',
			templateUrl:'/js/admin/views/doctor/create.html'	
		})		


		/** Auth routes **/
		.when('/auth/users/',{
			controller:'auth_user',
			templateUrl:'/js/admin/views/auth/user/index.html'	
		})

		.when('/auth/users/add/',{
			controller:'auth_user_create',
			templateUrl:'/js/admin/views/auth/user/create.html'	
		})		

	    .otherwise({
	    	redirectTo: '/home',
	    });
}]);