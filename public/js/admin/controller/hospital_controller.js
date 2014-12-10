/*
 *
 *
 **/

'use strict';

angular.module('app.controllers')

.controller('HospitalCtrl', ['$scope','HospitalService', function($scope,Hospital){
	
	$scope.message = 'hopsital index controller';
	$scope.totalItems = 0;
	
	$scope.pager = {
		current:1,
		total:1,
		perPage: 10
	};
	
	var getPages = function(pagerObj){
		var current = pagerObj.current;
		
		var maxPage = Math.ceil( pagerObj.total / pagerObj.perPage  );

		if(current > 1 && current < maxPage){
			return [current -1, current, current+1];
		}else if(current == 1 && Math.ceil( pagerObj.total / pagerObj.perPage  ) < 2 ){
			return [1];
		}else if( current >= Math.ceil( pagerObj.total / pagerObj.perPage  ) ){
			return [current - 1, current];			
		}

		return [current, current+1];
	};
	
	$scope.getPages = function(){
		return getPages($scope.pager);
	};

	$scope.actual = function(item){
		return $scope.pager.current === item;
	};

	$scope.load = function(){
		var page = arguments[0] || 1; 
		
		Hospital.list(page).then(function(data){
			$scope.data = data.result.rows;
			$scope.pager.total = data.result.count;
		},function(error){
			window.alert('Error ' + error);
		});
	};
	
	$scope.paginationPageLoad = function(page){
		if(page === 'last'){
			page = Math.ceil( $scope.pager.total / $scope.pager.perPage  );
		}

		$scope.pager.current = page;
		//$scope.load(page);
	};
	
	$scope.loadData = function(page){
		
	};
	
	$scope.showModal = function(){
		alert('Modal');	
	};
}]);