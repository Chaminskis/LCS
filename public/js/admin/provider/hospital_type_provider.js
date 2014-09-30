angular.module('app.providers')

.provider(['HospitalTypeProvider','$http','$q',function($q,$http){
	
	var baseUrlApi = "/app/manage/hospital_type/";
	var def = $q;
	
	var list = function(){
		return $http({
			url:baseUrlApi,
		}).then(function(response){
			return response.data.result;
		},function(error){
			def.reject(error);
		});
	};
	
	this.$get = function(){
		
		return {
			list:list,
		}	
	};
	
}]);