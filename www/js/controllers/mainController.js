/*global angular*/

/**
 * @ngdoc function
 * @name terry.controller:MainController
 * @description
 * # MainController
 * Controller for the terry
 */
angular.module('Controllers').controller('MainController', function ($scope, $location, ngNotify, $ionicModal, $ionicNavBarDelegate, $ionicPopup, applications, transfer_applications) {
    'use strict';

    $scope.main = {};
    $scope.main.dragContent = false;
    
    $scope.allowSideMenu = function (allowOrNot) {
        $scope.main.dragContent = allowOrNot;
    };

    $scope.applications = applications;
    $scope.transfer_Applications = transfer_applications;

    // callback for ng-click 'modal'- open Modal dialog to create a new application
    $ionicModal.fromTemplateUrl('templates/modal_createApplication.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.myapplication = {};

    // callback for ng-click 'createApplication':
    $scope.createApplication = function () {
        if ($scope.myapplication.uh_id && $scope.myapplication.first_name && $scope.myapplication.last_name) {
            ApplicationService.createApplication($scope.myapplication).then(
                function (result) {
                    $scope.myapplication.state = "Texas";
                    $scope.modal.hide();
                    $scope.updateList();
                    ngNotify.set("Succesfully created your application.", {
                        position: 'bottom',
                        type: 'success'
                    });
                },
                function (error) {
                    ngNotify.set("Could not contact server to create application!", {
                        position: 'bottom',
                        type: 'error'
                    });

                }
            );
        } else {
            ngNotify.set("Remember to fill in everything!", {
                position: 'bottom',
                type: 'error'
            });
        }
    };

    // callback for ng-click 'deleteApplication':
    $scope.deleteApplication = function () {

        $ionicPopup.confirm({
            title: 'Confirm Delete',
            template: 'Are you sure you want to delete your application?'
        }).then(function (res) {
            if (res) {
                ApplicationService.deleteApplication($scope.myapplications[0].id).then(
                    function (result) {
                        $scope.updateList();
                        ngNotify.set("Succesfully deleted your application.", {
                            position: 'bottom',
                            type: 'success'
                        });
                    },
                    function (error) {
                        ngNotify.set("Could not contact server to delete application!", {
                            position: 'bottom',
                            type: 'error'
                        });
                    }
                );

            } else {
                console.log('You are not sure to delete');
            }
        });
    };

  
});