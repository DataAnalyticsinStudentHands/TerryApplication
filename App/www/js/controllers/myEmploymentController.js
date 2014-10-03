/*global angular, console*/


/**
 * @ngdoc function
 * @name myapplication.controller:MyEmploymentController
 * @description
 * # MyEmploymentController
 * Controller for the terry
 */
angular.module('TerryControllers').controller('MyEmploymentController', function ($scope, ngNotify, $stateParams, $state, $filter, Restangular, $ionicSideMenuDelegate, $ionicPopup, $ionicModal, DataService, MyEmploymentService, MyActivityService, MyVolunteerService, MyAwardService) {
    'use strict';

    $scope.myVariables = {
        current_mode: 'Add',
        acType: 1
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
    DataService.getAll('employment').then(
        function (result) {
            result = Restangular.stripRestangular(result);
            $scope.myemployments = result;
        },
        function (error) {
            ngNotify.set("Something went wrong retrieving data.", {
                type: "error",
                sticky: true
            });
        }
    );

    // GET 
    MyActivityService.getAllActivity().then(
        function (result) {
            $scope.myactivities = result;

        },
        function (error) {
            ngNotify.set("Something went wrong retrieving data.", {
                type: "error",
                sticky: true
            });
        }
    );

    // GET 
    MyVolunteerService.getAllVolunteer().then(
        function (result) {
            $scope.myvolunteers = result;
        },
        function (error) {
            ngNotify.set("Something went wrong retrieving data.", {
                type: "error",
                sticky: true
            });
        }
    );

    // GET 
    MyAwardService.getAllAward().then(
        function (result) {
            $scope.myawards = result;
        },
        function (error) {
            ngNotify.set("Something went wrong retrieving data.", {
                type: "error",
                sticky: true
            });
        }
    );

    // callback for ng-click 'deleteData':
    $scope.deleteData = function (itemId, acType) {
        $ionicPopup.confirm({
            title: 'Confirm Delete',
            template: 'Are you sure you want to delete one item from the list?'
        }).then(function (res) {
            if (res) {
                switch (acType) {
                case 1:
                    MyEmploymentService.deleteEmployment(itemId).then(
                        function (success) {
                            $scope.updateLists(acType);
                        }
                    );
                    break;
                case 2:
                    MyActivityService.deleteActivity(itemId).then(
                        function (success) {
                            $scope.updateLists(acType);
                        }
                    );
                    break;
                case 3:
                    MyVolunteerService.deleteVolunteer(itemId).then(
                        function (success) {
                            $scope.updateLists(acType);
                        }
                    );
                    break;
                case 4:
                    MyAwardService.deleteAward(itemId).then(
                        function (success) {
                            $scope.updateLists(acType);
                        }
                    );
                    break;
                default:
                    MyEmploymentService.deleteEmployment(itemId);
                }

            } else {
                console.log('You are not sure to delete');
            }
        });
    };

    // callback for ng-click 'editData':
    $scope.editData = function (item, acType) {
        $scope.myVariables.current_mode = "Edit";

        switch (acType) {
        case 1:
            $scope.myemployment = item;
            $ionicModal.fromTemplateUrl('templates/modal_employment.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal1 = modal;
                $scope.modal1.show();
            });
            break;
        case 2:
            $scope.myactivity = item;
            $scope.yearInSchoolList = angular.fromJson($scope.myactivity.year);
            $ionicModal.fromTemplateUrl('templates/modal_activity.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal2 = modal;
                $scope.modal2.show();
            });
            break;
        case 3:
            $scope.myvolunteer = item;
            $ionicModal.fromTemplateUrl('templates/modal_volunteer.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal3 = modal;
                $scope.modal3.show();
            });
            break;
        case 4:
            $scope.myaward = item;
            $scope.yearInSchoolList = angular.fromJson($scope.myaward.year);
            $ionicModal.fromTemplateUrl('templates/modal_award.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal4 = modal;
                $scope.modal4.show();
            });
            break;
        default:
            $scope.myemployment = item;
        }
    };

    // callback for ng-click 'saveModal':
    $scope.saveModal = function (acType) {

        switch (acType) {
        case 1:
                
            $scope.myemployment.application_id = $stateParams.applicationId;

            if ($scope.myVariables.current_mode === "Add") {
                MyEmploymentService.addEmployment($scope.myemployment).then(
                    function (success) {
                        $scope.updateLists(acType);
                        $scope.modal1.hide();
                    }
                );
            } else {
                MyEmploymentService.updateEmployment($scope.myemployment.id, $scope.myemployment).then(
                    function (success) {
                        $scope.modal1.hide();
                    }
                );
            }
            break;
        case 2:
            $scope.myactivity.application_id = $stateParams.applicationId;
            // convert year in school to string
            $scope.myactivity.year = angular.toJson($scope.yearInSchoolList);

            if ($scope.myVariables.current_mode === "Add") {

                MyActivityService.addActivity($scope.myactivity).then(
                    function (success) {
                        $scope.updateLists(acType);
                        $scope.modal2.hide();
                    }
                );
            } else {
                MyActivityService.updateActivity($scope.myactivity.id, $scope.myactivity).then(
                    function (success) {
                        $scope.modal2.hide();
                    }
                );
            }
            break;
        case 3:
            $scope.myvolunteer.application_id = $stateParams.applicationId;
            if ($scope.myVariables.current_mode === "Add") {
                MyVolunteerService.addVolunteer($scope.myvolunteer).then(
                    function (success) {
                        $scope.updateLists(acType);
                        $scope.modal3.hide();
                    }
                );
            } else {
                MyVolunteerService.updateVolunteer($scope.myvolunteer.id, $scope.myvolunteer).then(
                    function (success) {
                        $scope.modal3.hide();
                    }
                );
            }
            break;
        case 4:
            $scope.myaward.application_id = $stateParams.applicationId;
            // convert year in school to string
            $scope.myaward.year = angular.toJson($scope.yearInSchoolList);
            if ($scope.myVariables.current_mode === "Add") {
                MyAwardService.addAward($scope.myaward).then(
                    function (success) {
                        $scope.updateLists(acType);
                        $scope.modal4.hide();
                    }
                );
            } else {
                MyAwardService.updateAward($scope.myaward.id, $scope.myaward).then(
                    function (success) {
                        $scope.modal4.hide();
                    }
                );
            }
            break;
        default:
            // need to define a default
        }

    };

    // Open a modal
    $scope.showAddData = function (acType) {
        $scope.myVariables.current_mode = "Add";

        switch (acType) {
        case 1:
            $scope.myemployment = {};
            $ionicModal.fromTemplateUrl('templates/modal_employment.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal1 = modal;
                $scope.modal1.show();
            });
            break;
        case 2:
            $scope.myactivity = {};
            $ionicModal.fromTemplateUrl('templates/modal_activity.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal2 = modal;
                $scope.modal2.show();
            });
            break;
        case 3:
            $scope.myvolunteer = {};
            $ionicModal.fromTemplateUrl('templates/modal_volunteer.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal3 = modal;
                $scope.modal3.show();
            });
            break;
        case 4:
            $scope.myaward = {};
            $ionicModal.fromTemplateUrl('templates/modal_award.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal4 = modal;
                $scope.modal4.show();
            });
            break;
        default:
            //need to define a default
        }
    };

    $scope.updateLists = function (acType) {

        switch (acType) {
        case 1:
            MyEmploymentService.getAllEmployment().then(
                function (result) {
                    $scope.myemployments = result;
                },
                function (error) {
                    ngNotify.set("Something went wrong retrieving data.", {
                        type: "error",
                        sticky: true
                    });
                }
            );
            break;
        case 2:
            MyActivityService.getAllActivity().then(
                function (result) {
                    $scope.myactivities = result;
                },
                function (error) {
                    ngNotify.set("Something went wrong retrieving data.", {
                        type: "error",
                        sticky: true
                    });
                }
            );
            break;
        case 3:
            MyVolunteerService.getAllVolunteer().then(
                function (result) {
                    $scope.myvolunteers = result;
                },
                function (error) {
                    ngNotify.set("Something went wrong retrieving data.", {
                        type: "error",
                        sticky: true
                    });
                }
            );
            break;
        case 4:
            MyAwardService.getAllAward().then(
                function (result) {
                    $scope.myawards = result;
                },
                function (error) {
                    ngNotify.set("Something went wrong retrieving data.", {
                        type: "error",
                        sticky: true
                    });
                }
            );
            break;
        default:
            //need to define a default
        }
    };

    $scope.openDatePicker = function (title, type) {
        $scope.tmp = {};

        var datePopup = $ionicPopup.show({
            template: '<datetimepicker data-ng-model="tmp.newDate"></datetimepicker>',
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
                        var test = $filter('date')($scope.tmp.newDate, 'dd/MM/yyyy');
                        var res = title.substring(0, 1);
                        
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