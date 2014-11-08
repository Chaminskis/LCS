/*
 *
 *
 **/

'use strict';
angular.module('app.controllers', ['app.services'])
.controller('HomeCtrl', ['$scope', 'HomeHospitalService', '$q',  function($scope, service, $q){

    
    var filters = [];

    filters.addFilter = function(filter){
        this.push(filter);
    };

    filters.removeFilter = function(filter){
        this.remove(filter);
    };

    filters.filternameExists = function(filtername){       
        return this.indexOf(filtername) !== -1;
    };


    var Filter = function(filtername, param, isDisabled, filtersCollection){
        var self = this;
        this.filtername = filtername;
        this.param = param;
        this.isDisabled = isDisabled;
        this.addToSelectedFilters = function(){
            filtersCollection.addFilter(self);
        }
        this.removeFromSelectedFilters = function(){
            filtersCollection.removeFilter(self);
        }
    }

    Array.prototype.remove = function(object){
        var index = this.indexOf(object);
        if(index !== -1)
            return this.splice(object, 1);
    };

    Array.prototype.contains = function(object){
        return this.indexOf(object) !== -1;
    }

    $scope.insuranceFilter = new Filter("INSURANCE", [], true, filters);
    $scope.hospitalTypeFilter = new Filter("HOSPITALTYPE", [], true, filters);
    $scope.locationFilter = new Filter("LOCATION", { lat: '', lon: '', distance: 50 }, false);
    $scope.criteriaFilter = new Filter("CRITERIA", '', true, filters);
    $scope.locationFilter.isSelected = true;
    // $scope.$watch("insuranceFilter.isDisabled", function(filterIsDisabled){
    //     if(!filterIsDisabled){
    //         $scope.mainInsurances.forEeach(function(i){
    //             i.isSelected = false;
    //         });
    //     }
    //     console.log($scope.mainInsurances);
    // });

    // $scope.$watch("hospitalTypeFilter.isDisabled", function(filterIsDisabled){
    //     if(!filterIsDisabled){
    //         $scope.institutionTypes.forEeach(function(i){
    //             i.isSelected = false;
    //         });
    //     }
    //     console.log($scope.mainInsurances);
    // });

    var addOrRemoveFilterParam = function(id){
        var filter = this;
        if(!filter.param.contains(id)){
            filter.isDisabled = false;
            if(!filters.contains(filter)){
                filter.addToSelectedFilters();
                filter.param.push(id);
            }
        }else{
            filter.param.remove(id);
            filter.selectAll();
        }
        console.log(filter.param);
    };
    $scope.insuranceFilter.addOrRemoveInsurance = addOrRemoveFilterParam;
    $scope.hospitalTypeFilter.addOrRemoveHospitalType = addOrRemoveFilterParam;
    
    $scope.addOrRemoveInsurance = function(id){
        this.insuranceFilter.addOrRemoveInsurance(id);
    }

    $scope.addOrRemoveHospitalType = function(id){
        this.hospitalTypeFilter.addOrRemoveHospitalType(id);
    }

    $scope.insuranceFilter.selectAll = function(){
        for (var i = 0; i < mainInsurances.length; i++) {
            mainInsurances[i].isSelected = true;
        };
    }; 

    $scope.hospitalTypeFilter.selectAll = function(){
        for (var i = 0; i < mainInsurances.length; i++) {
            mainInsurances[i].isSelected = true;
        };
    }


    $scope.addOrRemoveGlobalFilter = function(filtername){
        var filter = $scope.getFilter(filtername);
        var selectedFilters = filters;

        if(filter.isDisabled){
            selectedFilters.removeFilter(filter);
        }else
            selectedFilters.addFilter(filter);
        console.log(filters);
    };

    $scope.getFilter = function(filtername){
            return this[filtername] || undefined;
    };


    var masterSearchObjectParam = {
        searchType: '',

        addCriteriaParam: function(filter){
            if(!this.criteria){
                this.criteria = [];
            }
            searchType = searchType + "| " + filter.filtername;
            this.criteria = this.criteria + "| " + JSON.stringify(filter.param);
        },

        addLocationParam: function(locationFilter){
            searchType = searchType + "| " + locationFilter.filtername;
            this.location = locationFilter.param;
        }
    };


    var buildSearchMultiCriteriaParam = function(){
        var searchParam = angular.copy(masterSearchObjectParam);

        for (var i = 0; i < filters.length; i++) {

           searchParam.addCriteriaParam(filter);
        };
        if(locationIsSelected()){
            searchParam.addLocationParam($scope.locationFilter);
        }
        return searchParam;
    };

    var locationIsSelected = function(){
        return $scope.locationFilter.isSelected; 
    }

    var buildSearchNameCriteriaParam = function(){

        var searchParam = angular.copy(masterSearchObjectParam);
        searchParam.addCriteriaParam(criteriaFilter);
        if(locationIsSelected()){
            searchParam.addLocationParam($scope.locationFilter);
        }

        return searchParam;
    };

    var initializeMap = function(){
        var mapOptions = {
        zoom: 15,
        center: new google.maps.LatLng(40.0000, -98.0000),
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: window.shift_worker_style
        };
        $scope.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
        $scope.markers = [];        
        $scope.directionsService = new google.maps.DirectionsService();
        $scope.directionsDisplay = new google.maps.DirectionsRenderer();
        $scope.distanceService = new google.maps.DistanceMatrixService();
        $scope.directionsDisplay.setMap($scope.map);
        $scope.searchString;
        $scope.includeDrivingBasedLocations = true;
        setSearchResultsBar();
    };

    var calculateCurrentPosition = function(){

        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);

                $scope.currentPosition = pos;

                var markerInfo = {
                    map: $scope.map,
                    position: $scope.currentPosition,
                    title: 'Estás Aquí',
                    className: 'map-icon-male',
                    pin: SQUARE_PIN
                };

                var marker = createCustomMarker(markerInfo);

                $scope.map.setCenter(pos);
                $scope.locationFilter.param.lat = position.coords.latitude;
                $scope.locationFilter.param.lon = position.coords.longitude;
                findHospitalsByLocation($scope.locationFilter.param);

            }, function() {
                console.log("Error!");
            });
        } else {
                // Browser doesn't support Geolocation
            console.log("Browser doesn't support Geolocation");
        }
        
    };

    var getDistance = function(marker){
        
        var def = $q.defer();
        var request = {
            origins: [ $scope.currentPosition ],
            destinations: [ marker.position],
            travelMode: google.maps.TravelMode.DRIVING,
            avoidHighways: false,
            avoidTolls: false
        };

        $scope.distanceService.getDistanceMatrix(request, function(response,status){
            if(status == google.maps.DistanceMatrixStatus.OK){
                var result = response.rows[0].elements;

                // place that distance somewhere else, this popup is gone
                // $scope.popup.distance = result[0].distance.text;
                // $scope.popup.duration = result[0].duration.text;
                def.resolve(response);
            }else{
                console.log("Error calculating distance: " + status);
            }
        });

        return def.promise;
    }


    var drawRoute = function(marker){
        
        var def = $q.defer(); 
       $scope.directionsDisplay.setDirections({routes: []});
        var start = $scope.currentPosition;
        var end = marker.position;
        var request = {
              origin:start,
              destination:end,
              travelMode: google.maps.TravelMode.DRIVING
        };
        
        $scope.directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                $scope.directionsDisplay.setDirections(response);
                def.resolve(response);
            }
        });
        
        var bounds = new google.maps.LatLngBounds($scope.currentPosition, marker.position);
        $scope.map.fitBounds(bounds);
 
        return def.promise;
    };

    var setPopup = function(){
        $scope.popup = new Object();
        $scope.popup.show = false;
    };

    var showPopup = function(marker){
        
        if(!$scope.searchModeOn){
            $scope.popup.show = true;
            $scope.popup.title = marker.title;
            $scope.popup.content = marker.description;
        }
    };

    var createMarker = function(info, addMarkerlistener){
        
        var infoWindow = new google.maps.InfoWindow();

        var markerInfo = {
            map: $scope.map,
            position: new google.maps.LatLng(info.latitude, info.longitude),
            title: info.title,
            className: 'map-icon-health',
            pin: SQUARE_PIN
        };
        var marker = createCustomMarker(markerInfo);

        $scope.markers.push(marker);
        marker.content = '<div class="infoWindowContent">' + info.details + '</div>';
        marker.description = info.details;
        addMarkerlistener(marker);
        return marker;
    }; 

    var showPopupRouteAndDistanceOnClick = function(marker){
        google.maps.event.addListener(marker, 'click', function(){        
            $q.all([drawRoute(marker), getDistance(marker)]).then(function(a, b){
                showPopup(marker);
            }, function(error){
                console.log("You failed, bitch");
            }); 
        });
    }

    var showRouteAndDistance = function(marker){
             drawRoute(marker); 
             getDistance(marker);
    }
    

    var findHospitalsByCriteria = function(){
        $scope.markers = [];
        console.log($scope.searchString);
                    
        service.findHospitalsByCriteria(criteria).then(function(response){
            if(!response.error){
                var hospitals = response.result;
                setHospitals(hospitals);
            }
        });    
    };

    var findHospitalsByLocation = function(location){
        $scope.markers = [];
        console.log("searching hospitals by location");
        
        service.findHospitalsByLocation(location).then(function(response){
            if(!response.error){            
                
                var hospitals = response.result;
                console.log(hospitals);
                setHospitals(hospitals);          
            }

        });
    };

    var setHospitals = function(hospitals){
        
        var marker;
        for (var i = 0; i < hospitals.length; i++){
            marker = createMarker(hospitals[i], showPopupRouteAndDistanceOnClick);
            marker.name = hospitals[i].name;
            marker.address = hospitals[i].address;
        }            

    };

    $scope.showMarkerRoute = function(e, selectedMarker){
        e.preventDefault();
        showRouteAndDistance(selectedMarker);
        // enableSearchMode();
    };        

    
    $scope.setup = function(){
        initializeMap();
        calculateCurrentPosition();
    };

    $scope.viewPopUp = function(){
        if($scope.popup.show)
            return "popup-show";
    };

    $scope.closePopUp = function(){
        $scope.popup.show = false;
    };

    var enableSearchMode = function(){
        $scope.searhModeOn = true;
        $scope.bar.show = true;
        $scope.map.partialWidth = true;
        // $scope.popup.show = false;
    };
    
    $scope.search = function(){
        removeAllMarkers();
        var hospitals = service.findHospitalsByCriteria($scope.searchCriteria);
        $scope.markers = [];
        for(var i = 0; i < hospitals.length; i++){
            createMarker(hospitals[i], showPopupRouteAndDistanceOnClick);
        }

        enableSearchMode();       
    };

    var setSearchResultsBar = function(){
        $scope.bar = new Object();
        $scope.bar.show = true;   
        $scope.searchModeOn = true;
    };


    $scope.setMapWidth = function(){
        if($scope.map.partialWidth)
            return "map-partial-width";
    };

    $scope.showResultsBar = function(){
        if(!$scope.bar.show)
            return "side-bar-hidden";
    };

    $scope.disableSearchMode = function(){
        console.log("disabling search mode");
        $scope.bar.show = false;
        $scope.map.partialWidth = false;
        $scope.searchModeOn = false;
    };

    $scope.changeSearchMode = function(){
        if($scope.bar.show)
            $scope.disableSearchMode();
        else
            enableSearchMode();
    };

    var selectedInsurances = []; 
    $scope.mainInsurances = [
        { id: 1, name: "PALIC", isSelected: true },
        { id: 2, name: "UNIVERSAL", isSelected: true },
        { id: 3, name: "HUMANO", isSelected: true },
        { id: 4, name: "SENASA", isSelected: true },
    ];

    $scope.hospitalTypes = [
        { id: 1, name: "HOSPTIAL", isSelected: true },
        { id: 2, name: "CLINICA", isSelected: true },
        { id: 3, name: "UNIDAD DE ATENCION PRIMARIA", isSelected: true },
    ];

    var removeAllMarkers = function(){
        for(var i = 0; i < $scope.markers.length; i++){
            $scope.markers[i].setMap(null);
        }
    }

    var createCustomMarker = function(customMarkerInfo){
        var marker = new Marker({
            map: customMarkerInfo.map,
            title: customMarkerInfo.title,
            position: customMarkerInfo.position,
            zIndex: 9,
            icon: {
                path: customMarkerInfo.pin,
                fillColor: '#d42c14',
                fillOpacity: 1,
                strokeColor: '',
                strokeWeight: 0,
                scale: 1/2
            },
            label: "<i class='"+customMarkerInfo.className+"'></i>"
        });

        return marker;
    };

}]);

angular.module('app.controllers').directive('test',['$timeout','$parse',function($timeout,$parse) {
    return{
        require: 'ngModel',
        link:function(scope, element, attrs,ngModel){
            element.text("la directiva");
        }
    }
}]);



angular.module('app.controllers').directive('iCheck', ['$timeout', function($timeout) {
 return {
        require: 'ngModel',
        restrict: 'A',
        link: function($scope, element, $attrs, ngModel) {
 
            return $timeout(function() {
                var value;
                value = $attrs['value'];

                $scope.$watch($attrs['ngModel'], function(newValue){
                    $(element).iCheck('update');
                });

                var changeMethod = $attrs['ngChange'];
                changeMethod = changeMethod.replace(/(\(|\))/g, "");
                var changedMethodParam = $attrs['ngChangeParam'];

                return $(element).iCheck({
                    // the classes, if you need them.
                    checkboxClass: 'icheckbox_square',
                    radioClass: 'iradio_square',
                    increaseArea: '20%' // optional
                }).on('ifChanged', function(event) {

                    if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
                        $scope.$apply(function() {
                            return ngModel.$setViewValue(event.target.checked);
                        });
                    }
                    if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
                        return $scope.$apply(function() {
                            return ngModel.$setViewValue(value);
                        });
                    }

                    if(changeMethod){
                        if(changedMethodParam){
                            $scope[changeMethod](changedMethodParam);
                        }
                        else
                            $scope[changeMethod]();
                    }
                    
                });
            });
        }
    };
}]);