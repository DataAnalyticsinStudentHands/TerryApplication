/*global angular, console*/
'use strict';

/**
 * @ngdoc function
 * @name myapplication.controller:MyEmploymentController
 * @description
 * # MyEmploymentController
 * Controller for the terry
 */
angular.module('TerryControllers').controller('MyEmploymentController', function ($scope, ngNotify, $stateParams, $state, $filter, $ionicSideMenuDelegate,  $ionicPopup, $ionicModal, MyEmploymentService) {
    
    $scope.data = {
        showDelete: true
    };

    $scope.toggleRight = function () {
        $ionicSideMenuDelegate.toggleRight();
    };
    
    $scope.mydata = {};
    $scope.mynewdata = {};
    
    // GET 
    MyEmploymentService.getAllEmployment().then(
        function (result) {
            $scope.mydata = result;
        },
        function (error) {
            console.error(error);
            ngNotify.set("Something went wrong retrieving data.", {type : "error", sticky : true});
        }
    ); 
    
    // callback for ng-click 'deleteData':
    $scope.deleteData = function (dataId) {
        MyEmploymentService.deleteEmployment(dataId);
    };

    // callback for ng-click 'addData':
    $scope.addData = function () {
        $scope.mynewdata.application_id = $stateParams.applicationId;
        if ($scope.mynewdata.position && $scope.mynewdata.hours) {
            MyEmploymentService.addEmployment($scope.mynewdata).then(
                function (result) {
                    $scope.modal.hide();
                    ngNotify.set("Succesfully added your employment.", {position: 'bottom', type: 'success'});
                },
                function (error) {
                    ngNotify.set("Could not contact server to add employment!", {position: 'bottom', type: 'error'});
                }
            );
        } else {
            ngNotify.set("Remember to fill in everything!", {position: 'bottom', type: 'error'});
        }
    };

    // callback for ng-click 'modal'- open Modal dialog to add new data
    $ionicModal.fromTemplateUrl('modal_addEmployment.html', {
        scope : $scope,
        animation : 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal; 
    });
    
    // Open the modal
    $scope.showAddData = function() {
  	    $scope.modal.show();
    };

    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
        MyEmploymentService.getAllEmployment().then(
            function (result) {
                $scope.mydata = result;
            },
            function (error) {
                console.error(error);
            }
        );
    });
    
    $scope.pickedDates = {};

    $scope.$watch('pickedDates.date_from', function (unformattedDate) {
        $scope.mynewdata.date_from = $filter('date')(unformattedDate, 'dd/MM/yyyy');
    });
    
    $scope.$watch('pickedDates.date_to', function (unformattedDate) {
        $scope.mynewdata.date_to = $filter('date')(unformattedDate, 'dd/MM/yyyy');
    });
    
    $scope.openDatePicker = function (testvar) {
        $scope.tmp = {};
        $scope.tmp.newDate = $scope.pickedDates.birthDate;
        
        var birthDatePopup = $ionicPopup.show({
            template: '<datetimepicker data-ng-model="tmp.newDate"></datetimepicker>',
            title: "Date",
            scope: $scope,
            buttons: [
                { text: 'Cancel' },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        if (testvar === 1) {
                            $scope.pickedDates.date_from = $scope.tmp.newDate;
                        }
                        if (testvar === 2) {
                            $scope.pickedDates.date_to = $scope.tmp.newDate;
                        }
                    }
                }
            ]
        });
    };
});