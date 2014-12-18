/*global angular, console*/

/**
 * @ngdoc function
 * @name controller:MainController
 * @description
 * # MainController
 * Main controller for Terry App
 */
angular.module('Controllers').controller('MainController', function ($scope, $state, $location, ngNotify, $ionicModal, $ionicNavBarDelegate, $ionicPopup, freshman_applications, transfer_applications, DataService) {
    'use strict';

    $scope.main = {};
    $scope.main.application_type = 'Freshman';

    if (freshman_applications.length !== 0)
        $scope.applications = freshman_applications;
    else 
        $scope.applications = transfer_applications;
    
    $scope.myapplication = {};

    // callback for ng-click 'createApplication'- open Modal dialog to create a new application
    $scope.createApplication = function (acType) {
        $scope.main.application_type = acType;
        $ionicModal.fromTemplateUrl('templates/modal/modal_createApplication.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            modal.show();
        });
    };

    // callback for modal form submit 'saveApplication':
    $scope.saveApplication = function () {
        if ($scope.myapplication.uh_id && $scope.myapplication.first_name && $scope.myapplication.last_name) {
            switch ($scope.main.application_type) {
            case 'Freshman':
                DataService.addItem('application', $scope.myapplication).then(
                    function (success) {
                        $scope.applications = DataService.getAllItems('application');
                        $scope.modal.hide();
                        $state.go($state.current, {}, {reload: true});
                    }
                );
                break;
            case 'Transfer':
                DataService.addItem('transferApplication', $scope.myapplication).then (
                    function (success) {
                        $scope.applications = DataService.getAllItems('transferApplication');
                        $scope.modal.hide();
                        $state.go($state.current, {}, {reload: true});
                    }
                );
                break;
            }
            
        } else {
            ngNotify.set("Remember to fill in everything!", {
                position: 'bottom',
                type: 'error'
            });
        }
    };
});