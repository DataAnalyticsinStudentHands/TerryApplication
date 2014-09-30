/*global angular, console*/


/**
 * @ngdoc function
 * @name myapplication.controller:MyEmploymentController
 * @description
 * # MyEmploymentController
 * Controller for the terry
 */
angular.module('TerryControllers').controller('MyEmploymentController', function ($scope, ngNotify, $stateParams, $state, $filter, $ionicSideMenuDelegate, $ionicPopup, $ionicModal, MyEmploymentService, MyActivityService, MyVolunteerService, MyAwardService) {
    'use strict';

    $scope.myVariables = {
        current_mode: 'Add',
        acType: 1
    };

    $scope.toggleRight = function () {
        $ionicSideMenuDelegate.toggleRight();
    };

    $scope.mydata = {};
    $scope.mynewdata = {};
    $scope.myactivities = {};
    $scope.mynewactivity = {};
    $scope.myvolunteers = {};
    $scope.mynewvolunteer = {};
    $scope.myawards = {};
    $scope.mynewaward = {};

    // GET 
    MyEmploymentService.getAllEmployment().then(
        function (result) {
            $scope.mydata = result;
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
            $scope.mynewdata = item;
            $scope.modal1.show();
            break;
        case 2:
            $scope.mynewactivity = item;
            $scope.yearInSchoolList = angular.fromJson($scope.mynewactivity.year);
            $scope.modal2.show();
            break;
        case 3:
            $scope.mynewvolunteer = item;
            $scope.modal3.show();
            break;
        case 4:
            $scope.mynewaward = item;
            $scope.yearInSchoolList = angular.fromJson($scope.mynewaward.year);
            $scope.modal4.show();
            break;
        default:
            $scope.mynewdata = item;
        }
    };

    // callback for ng-click 'saveModal':
    $scope.saveModal = function (acType) {

        switch (acType) {
        case 1:
            $scope.mynewdata.application_id = $stateParams.applicationId;

            if ($scope.myVariables.current_mode === "Add") {
                MyEmploymentService.addEmployment($scope.mynewdata).then(
                    function (success) {
                        $scope.updateLists(acType);
                        $scope.modal1.hide();
                    }
                );
            } else {
                MyEmploymentService.updateEmployment($scope.mynewdata.id, $scope.mynewdata).then(
                    function (success) {
                        $scope.modal1.hide();
                    }
                );
            }
            break;
        case 2:
            $scope.mynewactivity.application_id = $stateParams.applicationId;
            // convert year in school to string
            $scope.mynewactivity.year = angular.toJson($scope.yearInSchoolList);

            if ($scope.myVariables.current_mode === "Add") {

                MyActivityService.addActivity($scope.mynewactivity).then(
                    function (success) {
                        $scope.updateLists(acType);
                        $scope.modal2.hide();
                    }
                );
            } else {
                MyActivityService.updateActivity($scope.mynewactivity.id, $scope.mynewactivity).then(
                    function (success) {
                        $scope.modal2.hide();
                    }
                );
            }
            break;
        case 3:
            $scope.mynewvolunteer.application_id = $stateParams.applicationId;
            if ($scope.myVariables.current_mode === "Add") {
                MyVolunteerService.addVolunteer($scope.mynewvolunteer).then(
                    function (success) {
                        $scope.updateLists(acType);
                        $scope.modal3.hide();
                    }
                );
            } else {
                MyVolunteerService.updateVolunteer($scope.mynewvolunteer.id, $scope.mynewvolunteer).then(
                    function (success) {
                        $scope.modal3.hide();
                    }
                );
            }
            break;
        case 4:
            $scope.mynewaward.application_id = $stateParams.applicationId;
            // convert year in school to string
            $scope.mynewaward.year = angular.toJson($scope.yearInSchoolList);
            if ($scope.myVariables.current_mode === "Add") {
                MyAwardService.addAward($scope.mynewaward).then(
                    function (success) {
                        $scope.updateLists(acType);
                        $scope.modal4.hide();
                    }
                );
            } else {
                MyAwardService.updateAward($scope.mynewaward.id, $scope.mynewaward).then(
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

    // callback for ng-click 'modal'- open Modal dialog
    $ionicModal.fromTemplateUrl('templates/modal_Employment.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal1 = modal;
    });

    // callback for ng-click 'modal'- open Modal dialog
    $ionicModal.fromTemplateUrl('templates/modal_Activity.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal2 = modal;
    });

    // callback for ng-click 'modal'- open Modal dialog
    $ionicModal.fromTemplateUrl('templates/modal_Volunteer.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal3 = modal;
    });

    // callback for ng-click 'modal'- open Modal dialog
    $ionicModal.fromTemplateUrl('templates/modal_Award.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal4 = modal;
    });

    // Open a modal
    $scope.showAddData = function (acType) {
        $scope.myVariables.current_mode = "Add";

        switch (acType) {
        case 1:
            $scope.modal1.show();
            break;
        case 2:
            $scope.modal2.show();
            break;
        case 3:
            $scope.modal3.show();
            break;
        case 4:
            $scope.modal4.show();
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
                    $scope.mydata = result;
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

    $scope.pickedDates = {};

    $scope.$watch('pickedDates.empl_date_from', function (unformattedDate) {
        $scope.mynewdata.date_from = $filter('date')(unformattedDate, 'dd/MM/yyyy');
    });

    $scope.$watch('pickedDates.empl_date_to', function (unformattedDate) {
        $scope.mynewdata.date_to = $filter('date')(unformattedDate, 'dd/MM/yyyy');
    });

    $scope.$watch('pickedDates.vol_date_from', function (unformattedDate) {
        $scope.mynewvolunteer.date_from = $filter('date')(unformattedDate, 'dd/MM/yyyy');
    });

    $scope.$watch('pickedDates.vol_date_to', function (unformattedDate) {
        $scope.mynewvolunteer.date_to = $filter('date')(unformattedDate, 'dd/MM/yyyy');
    });

    $scope.openDatePicker = function (testvar) {
        $scope.tmp = {};
        $scope.tmp.newDate = $scope.pickedDates.birthDate;

        var birthDatePopup = $ionicPopup.show({
            template: '<datetimepicker data-ng-model="tmp.newDate"></datetimepicker>',
            title: "Date",
            scope: $scope,
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        switch (testvar) {
                        case 1:
                            $scope.pickedDates.empl_date_from = $scope.tmp.newDate;
                            break;
                        case 2:
                            $scope.pickedDates.empl_date_to = $scope.tmp.newDate;
                            break;
                        case 3:
                            $scope.pickedDates.vol_date_from = $scope.tmp.newDate;
                            break;
                        case 4:
                            $scope.pickedDates.vol_date_to = $scope.tmp.newDate;
                            break;
                        default:
                            //need to define a default
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