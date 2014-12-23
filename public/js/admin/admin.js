/*
 *
 *
 **/

'use strict';

angular.module('lcs-admin',['ngRoute','app.controllers'])

.config(['$routeProvider',function($routeProvider){

	$routeProvider
		.when('/home',{
			controller:'AdminHomeCtrl',
			templateUrl:'/js/admin/views/home.html'
		})

		/** Hospitals routes **/
		.when('/hospital/',{
			controller:'HospitalCtrl',
			templateUrl:'/js/admin/views/hospital/index.html'	
		})
		
		.when('/hospital/add/',{
			controller:'HospitalCreateCtrl',
			templateUrl:'/js/admin/views/hospital/create.html',
		})

		.when('/hospital/view/:id',{
			controller:'HospitalViewCtrl',
			templateUrl:'/js/admin/views/hospital/view.html'	
		})		

		/** Medical secure routes **/
		.when('/medical_insurance/',{
			controller:'MedicalInsuranceCtrl',
			templateUrl:'/js/admin/views/medical_insurance/index.html'	
		})
		
		.when('/medical_insurance/view/:id',{
			controller:'MedicalInsuranceViewCtrl',
			templateUrl:'/js/admin/views/medical_insurance/view.html'	
		})

		.when('/medical_insurance/add/',{
			controller:'MedicalInsuranceCreateCtrl',
			templateUrl:'/js/admin/views/medical_insurance/create.html'	
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
			controller:'AuthUser',
			templateUrl:'/js/admin/views/auth/user/index.html'	
		})

		.when('/auth/users/add/',{
			controller:'AuthUserCreate',
			templateUrl:'/js/admin/views/auth/user/create.html'	
		})
		
		.when('/auth/users/view/:id',{
			controller:'AuthUserView',
			templateUrl:'/js/admin/views/auth/user/view.html'	
		})

	    .otherwise({
	    	redirectTo: '/home',
	    });
}]);