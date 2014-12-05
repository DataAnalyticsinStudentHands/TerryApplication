/*global angular*/

/**
 * @ngdoc function
 * @name terry.controller:MainController
 * @description
 * # MainController
 * Controller for the terry
 */
angular.module('Controllers').controller('menuCtrl', function($scope, $state, $ionicSideMenuDelegate) {
    $scope.state = $state;
    $scope.toggleRight = function () {
        $ionicSideMenuDelegate.toggleRight();
    };
});