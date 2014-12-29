/*
 *
 *
 **/

'use strict';

angular.module('app.controllers')

.controller('HospitalCtrl', ['$routeParams','$scope','$location','HospitalService', function($routeParams,$scope,$location,Hospital){
	
	var page = $routeParams.page;
	
	$scope.message = 'hopsital index controller';
	$scope.totalItems = 0;
	
	$scope.pager = {
		current:1,
		total:1,
		perPage: 10
	};
	
	if(page !== undefined){
		$scope.pager.current = parseInt(page,10);
	}
	
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
		var page = arguments[0] || $scope.pager.current; 
		
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
		
		if(page == $scope.pager.current){
			return;
		}

		$scope.pager.current = page;
		
		$location.search({page: parseInt(page,10)});
		
		$scope.load(page);
	};
	
	$scope.loadData = function(page){
		
	};
	
	$scope.showModal = function(){
		alert('Modal');	
	};
	
	/*
	 *
	 * Search hospital
	 *
	 **/
	$scope.search = function(){
		var criteria = $scope.criteriaSearch;
		
		Hospital.searchByCriteria(criteria).then(function(data){
            
          	$scope.data = data.result.rows;
			$scope.pager.total = data.result.count;
          
        },function(){
            console.log("Mmmmmm creo que tus criterios de busquedas son raros");
        });
		
	};
}]);