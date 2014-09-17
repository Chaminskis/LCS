/*
 *
 *
 **/

'use strict';

angular.module('lcs-admin',['ngRoute','app.controllers'])

.config(['$routeProvider',function($routeProvider){

	$routeProvider
		.when('/home',{
			controller:'HomeCtrl',
			templateUrl:'/js/admin/views/home.html'
		})

		/** Hospitals routes **/
		.when('/hospital/',{
			controller:'HospitalCtrl',
			templateUrl:'/js/admin/views/hospital/index.html'	
		})

		.when('/hospital/add/',{
			controller:'HospitalCreateCtrl',
			templateUrl:'/js/admin/views/hospital/create.html'	
		})

		.when('/hospital/view/:id',{
			controller:'HospitalViewCtrl',
			templateUrl:'/js/admin/views/hospital/view.html'	
		})		

		/** Medical secure routes **/
		.when('/medical_secure/',{
			controller:'MedicalSecureCtrl',
			templateUrl:'/js/admin/views/medical_secure/index.html'	
		})
		
		.when('/medical_secure/view/:id',{
			controller:'MedicalSecureViewCtrl',
			templateUrl:'/js/admin/views/medical_secure/view.html'	
		})

		.when('/medical_secure/add/',{
			controller:'MedicalSecureCreateCtrl',
			templateUrl:'/js/admin/views/medical_secure/create.html'	
		})		


		/** Doctor routes **/
		.when('/doctors/',{
			controller:'DoctorIndexCtrl',
			templateUrl:'/js/admin/views/doctor/index.html'	
		})

		.when('/doctors/add/',{
			controller:'DoctorCreateCtrl',
			templateUrl:'/js/admin/views/doctor/create.html'	
		})		

		.when('/doctors/view/:id',{
			controller:'DoctorViewCtrl',
			templateUrl:'/js/admin/views/doctor/view.html'	
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