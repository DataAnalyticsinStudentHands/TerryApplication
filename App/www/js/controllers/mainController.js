/*global angular, console*/
'use strict';

/**
 * @ngdoc function
 * @name terry.controller:MainController
 * @description
 * # MainController
 * Controller for the terry
 */
angular.module('TerryControllers').controller('MainController', function ($scope, $location) {

    $scope.main = {};
    $scope.main.dragContent = false;
    
    $scope.allowSideMenu = function (allowOrNot) {
        $scope.main.dragContent = allowOrNot;
    };
  
});