'use strict';

/**
 * @ngdoc function
 * @name myapplication.controller:MyApplicationController
 * @description
 * # MyApplicationController
 * Controller for the terry
 */
angular.module('TerryControllers')
.controller('MyApplicationController', function($scope, Restangular, ngNotify, $stateParams, MyapplicationsService, $ionicSideMenuDelegate) {

    $scope.myapplication = {};

    $scope.Restangular().all("applications").get($stateParams.applicationId)
    .then(function(result) {
        console.log(result);
        $scope.myapplication = result;
    }, function(resultFail) {
        // console.log(resultFail);
    });
    
   $scope.toggleRight = function() {
    $ionicSideMenuDelegate.toggleRight();
  };
    
    
    // callback for ng-submit 'save':
    $scope.save = function() {
        if ($scope.myapplication.uh_id && $scope.myapplication.first_name && $scope.myapplication.last_name) {

            
            $scope.createsaveApplicationResultPromise = Restangular
            .all("applications").all($scope.myapplication.id).post($scope.myapplication).then(
                function(applications) {
                    ngNotify.set("Saved to server", {position: 'bottom', type: 'success'});
                }, function(resultFail) {
                    ngNotify.set("Could not contact server to save application!", {position: 'bottom', type: 'error'});
                });
        }
        else {
            ngNotify.set("Remember to fill in everything!", {position: 'bottom', type: 'error'});
        }
    }
});