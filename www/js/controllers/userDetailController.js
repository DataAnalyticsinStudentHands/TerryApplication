/*global angular, console*/

/**
 * @ngdoc function
 * @name terry.controller:UserDetailController
 * @description
 * # UserDetailController
 * Controller for the terry
 */
angular.module('Controllers').controller('UserController', function ($scope, UserService, user) {
    'use strict';

    $scope.user = user;

    // callback for ng-submit 'save': save user updates to server
    $scope.save = function () {
        UserService.editUser($scope.user.id, $scope.user);
    };

});