'use strict';

/**
 * @ngdoc function
 * @name myapplication.controller:MyApplicationController
 * @description
 * # MyApplicationController
 * Controller for the terry
 */
angular.module('TerryControllers')
.controller('MyApplicationController', function($scope, $stateParams, MyapplicationsService) {

    $scope.myapplication = {};

    $scope.Restangular().all("applications").get($stateParams.applicationId)
    .then(function(result) {
        console.log(result);
        $scope.myapplication = result;
    }, function(resultFail) {
        // console.log(resultFail);
    });
});