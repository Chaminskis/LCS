/*
 *
 *
 **/

'use strict';
angular.module('app.controllers', ['app.services'])
.controller('HomeCtrl', ['$scope', 'HomeHospitalService', '$q',  function($scope, service, $q){

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
        $scope.nice = true;
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
                var location = {
                    "lat": position.coords.latitude,
                    "lon": position.coords.longitude
                };

                findHospitalsByLocation(location)

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
    }

    var setHospitals = function(hospitals){
        
        var marker;
        for (var i = 0; i < hospitals.length; i++){
            marker = createMarker(hospitals[i], showPopupRouteAndDistanceOnClick);
            marker.name = hospitals[i].name;
            marker.address = hospitals[i].address;
        }            

    }

    $scope.showMarkerRoute = function(e, selectedMarker){
        e.preventDefault();
        showRouteAndDistance(selectedMarker);
        // enableSearchMode();
    }        

    
    $scope.setup = function(){
        initializeMap();
        calculateCurrentPosition();
    };

    $scope.viewPopUp = function(){
        if($scope.popup.show)
            return "popup-show";
    }

    $scope.closePopUp = function(){
        $scope.popup.show = false;
    }

    var enableSearchMode = function(){
        $scope.searhModeOn = true;
        $scope.bar.show = true;
        $scope.map.partialWidth = true;
        // $scope.popup.show = false;
    }
    
    $scope.search = function(){
        removeAllMarkers();
        var hospitals = service.findHospitalsByCriteria($scope.searchCriteria);
        $scope.markers = [];
        for(var i = 0; i < hospitals.length; i++){
            createMarker(hospitals[i], showPopupRouteAndDistanceOnClick);
        }

        enableSearchMode();       
    }

    var setSearchResultsBar = function(){
        $scope.bar = new Object();
        $scope.bar.show = true;   
        $scope.searchModeOn = true;
    }


    $scope.setMapWidth = function(){
        if($scope.map.partialWidth)
            return "map-partial-width";
    }

    $scope.showResultsBar = function(){
        if(!$scope.bar.show)
            return "side-bar-hidden";
    }

    $scope.disableSearchMode = function(){
        console.log("disabling search mode");
        $scope.bar.show = false;
        $scope.map.partialWidth = false;
        $scope.searchModeOn = false;
    }

    $scope.changeSearchMode = function(){
        if($scope.bar.show)
            $scope.disableSearchMode();
        else
            enableSearchMode();
    }

    var selectedInsurances = []; 
    $scope.mainInsurances = [
        { id: 1, name: "PALIC", isSelected: false },
        { id: 2, name: "UNIVERSAL", isSelected: false },
        { id: 3, name: "HUMANO", isSelected: false },
        { id: 4, name: "SENASA", isSelected: false },
    ];

    $scope.test = 1;

    var updateSelected = function(action, id) {
      if (action === 'add' && selectedInsurances.indexOf(id) === -1) {
        selectedInsurances.push(id);
      }
      if (action === 'remove' && selectedInsurances.indexOf(id) !== -1) {
        selectedInsurances.splice(selectedInsurances.indexOf(id), 1);
      }
      console.log(selectedInsurances);
    };

    $scope.test = function() {
      // var checkbox = $event.target;
      // var action = (checkbox.checked ? 'add' : 'remove');
      // insurance.isSelected = (checkbox.checked ? true : false);
      // updateSelected(action, insurance.id);
      console.log("hi!");
    };

    $scope.clickMe = false;
    window.test = function(){
        console.log("hey!");
    }

    $scope.checkInsurances = function(){
        console.log($scope.mainInsurances);
    }

    $scope.selectAll = function($event) {
      var checkbox = $event.target;
      var action = (checkbox.checked ? 'add' : 'remove');
      for ( var i = 0; i < $scope.entities.length; i++) {
        var entity = $scope.entities[i];
        updateSelected(action, entity.id);
      }
    };



    
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
        link: function($scope, element, $attrs, ngModel) {
 
            return $timeout(function() {
                var value;
                value = $attrs['value'];

                $scope.$watch($attrs['ngModel'], function(newValue){
                    $(element).iCheck('update');
                });

                var clickMethod = $attrs['ngClick'];
                clickMethod = clickMethod.replace(/(\(|\))/g, "");

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
                }).on('ifClicked', function(){
                    if(clickMethod)
                        $scope[clickMethod]();
                });
            });
        }
    };
}]);