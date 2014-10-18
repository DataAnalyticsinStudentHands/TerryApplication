/*global angular, console*/

/**
 * @ngdoc function
 * @name terry.controller:UserDetailController
 * @description
 * # UserDetailController
 * Controller for the terry
 */
angular.module('TerryControllers').controller('UserDetailController', function ($scope, Restangular, ngNotify, UserService) {
    'use strict';

    $scope.user = {};

    UserService.getUser().then(
        function (result) {
            result = Restangular.stripRestangular(result)[0];
            $scope.user = result;
        },
        function (error) {
        }
    );

    // callback for ng-submit 'save': save user updates to server
    $scope.save = function () {
        UserService.editUser($scope.user.id, $scope.user).then(
            function (result) {
                ngNotify.set("Saved to server.", {
                    position: 'bottom',
                    type: 'success'
                });
            },
            function (error) {
                ngNotify.set("Could not contact server to save new user information!", {
                    position: 'bottom',
                    type: 'error'
                });
            }
        );
    };

});