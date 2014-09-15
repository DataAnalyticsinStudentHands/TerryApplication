/*global angular, console*/
'use strict';

/**
 * @ngdoc function
 * @name terry.controller:MyapplicationsController
 * @description
 * # MyapplicationsController
 * Controller for the terry
 */
angular.module('TerryControllers').controller('MainController', function($scope, $location) {

    console.log('MainController');

    $scope.main = {};
    $scope.main.dragContent = false;
    
    $scope.allowSideMenu = function(allowOrNot) {
      $scope.main.dragContent = allowOrNot;
    }

  
})