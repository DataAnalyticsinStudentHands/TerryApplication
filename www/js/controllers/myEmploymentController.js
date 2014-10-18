/*global angular, console*/


/**
 * @ngdoc function
 * @name myapplication.controller:MyEmploymentController
 * @description
 * # MyEmploymentController
 * Controller for the terry
 */
angular.module('TerryControllers').controller('MyEmploymentController', function ($scope, $stateParams, $state, $filter, $ionicSideMenuDelegate, $ionicPopup, $ionicModal, DataService) {
    'use strict';

    $scope.myVariables = {
        current_mode: 'Add',
        acType: 'employment'
    };

    $scope.toggleRight = function () {
        $ionicSideMenuDelegate.toggleRight();
    };

    $scope.myemployments = {};
    $scope.myemployment = {};
    $scope.myactivities = {};
    $scope.myactivity = {};
    $scope.myvolunteers = {};
    $scope.myvolunteer = {};
    $scope.myawards = {};
    $scope.myaward = {};

    // GET 
    DataService.getAllItems('employment').then(
        function (result) {
            $scope.myemployments = result;
        }
    );

    // GET 
    DataService.getAllItems('activity').then(
        function (result) {
            $scope.myactivities = result;
        }
    );

    // GET 
    DataService.getAllItems('volunteer').then(
        function (result) {
            $scope.myvolunteers = result;
        }
    );

    // GET 
    DataService.getAllItems('award').then(
        function (result) {
            $scope.myawards = result;
        }
    );

    // callback for ng-click 'deleteData':
    $scope.deleteData = function (acType, item_id) {
        $ionicPopup.confirm({
            title: 'Confirm Delete',
            template: 'Are you sure you want to delete one ' + acType + ' from the list?'
        }).then(function (res) {
            if (res) {
                DataService.deleteItem(acType, item_id).then(
                    function (success) {
                        $scope.updateLists(acType);
                    }
                );
            } else {
                console.log('Delete canceled.');
            }

        });
    };

    // callback for ng-click 'editData':
    $scope.editData = function (acType, item) {

        $scope.myVariables.current_mode = "Edit";
        $scope.myemployment = item;
        $scope.myactivity = item;
        $scope.myvolunteer = item;
        $scope.myaward = item;

        $ionicModal.fromTemplateUrl('templates/modal_' + acType + '.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
    };

    // callback for ng-click 'saveModal':
    $scope.saveModal = function (acType) {

        switch (acType) {
        case 'employment':

            $scope.myemployment.application_id = $stateParams.applicationId;

            if ($scope.myVariables.current_mode === "Add") {
                DataService.addItem('employment', $scope.myemployment).then(
                    function (success) {
                        $scope.modal.hide();
                        $scope.updateLists(acType);
                    }
                );
            } else {
                DataService.updateItem('employment', $scope.myemployment.id, $scope.myemployment).then(
                    function (success) {
                        $scope.modal.hide();
                    }
                );
            }
            break;
        case 'activity':
            $scope.myactivity.application_id = $stateParams.applicationId;
            // convert year in school to string
            $scope.myactivity.year = angular.toJson($scope.yearInSchoolList);

            if ($scope.myVariables.current_mode === "Add") {

                DataService.addItem('activity', $scope.myactivity).then(
                    function (success) {
                        $scope.modal.hide();
                        $scope.updateLists(acType);
                    }
                );
            } else {
                DataService.updateItem('activity', $scope.myactivity.id, $scope.myactivity).then(
                    function (success) {
                        $scope.modal.hide();
                    }
                );
            }
            break;
        case 'volunteer':
            $scope.myvolunteer.application_id = $stateParams.applicationId;
            if ($scope.myVariables.current_mode === "Add") {
                DataService.addItem('volunteer', $scope.myvolunteer).then(
                    function (success) {
                        $scope.modal.hide();
                        $scope.updateLists(acType);
                    }
                );
            } else {
                DataService.updateItem('volunteer', $scope.myvolunteer.id, $scope.myvolunteer).then(
                    function (success) {
                        $scope.modal.hide();
                    }
                );
            }
            break;
        case 'award':
            $scope.myaward.application_id = $stateParams.applicationId;
            // convert year in school to string
            $scope.myaward.year = angular.toJson($scope.yearInSchoolList);
            if ($scope.myVariables.current_mode === "Add") {
                DataService.addItem('award', $scope.myaward).then(
                    function (success) {
                        $scope.modal.hide();
                        $scope.updateLists(acType);
                    }
                );
            } else {
                DataService.updateItem('award', $scope.myaward.id, $scope.myaward).then(
                    function (success) {
                        $scope.modal.hide();
                    }
                );
            }
            break;
        }

    };

    // callback for ng-click 'showAddData':
    $scope.showAddData = function (acType) {

        $scope.myVariables.current_mode = "Add";
        $scope.myemployment = {};
        $scope.myactivity = {};
        $scope.myvolunteer = {};
        $scope.myaward = {};

        $ionicModal.fromTemplateUrl('templates/modal_' + acType + '.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
    };

    $scope.updateLists = function (acType) {

        DataService.getAllItems(acType).then(
            function (result) {
                switch (acType) {
                case 'employment':
                    $scope.myemployments = result;
                    break;
                case 'activity':
                    $scope.myactivities = result;
                    break;
                case 'volunteer':
                    $scope.myvolunteers = result;
                    break;
                case 'award':
                    $scope.myawards = result;
                    break;
                }
            }
        );
    };

    $scope.openDatePicker = function (title, type) {
        $scope.tmp = {};

        var datePopup = $ionicPopup.show({
            template: '<datetimepicker data-ng-model="tmp.newDate" data-datetimepicker-config="{ startView:\'year\', minView:\'day\' }"></datetimepicker>',
            title: title,
            scope: $scope,
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        var test = $filter('date')($scope.tmp.newDate, 'MM/dd/yyyy'),
                            res = title.substring(0, 1);

                        if (res === 'E') {
                            $scope.myemployment[type] = test;
                        } else {
                            $scope.myvolunteer[type] = test;
                        }

                    }
                }
            ]
        });
    };

    $scope.yearInSchoolList = [
        {
            text: "Freshman",
            checked: true
        },
        {
            text: "Sophomore",
            checked: false
        },
        {
            text: "Junior",
            checked: false
        },
        {
            text: "Senior",
            checked: false
        }
    ];
});