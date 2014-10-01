/*global angular, console*/

/**
 * @ngdoc function
 * @name myapplication.controller:MyApplicationController
 * @description
 * # MyApplicationController
 * Controller for the terry
 */
angular.module('TerryControllers').controller('MyApplicationController', function ($scope, $http, Restangular, ngNotify, $stateParams, $state, $filter, $ionicSideMenuDelegate, $ionicModal, $ionicPopup, MyApplicationService, MyCourseworkService, MyUniversityService, MyScholarshipService, MyChildService) {
    'use strict';

    //Load some variables
    $http.get('json/states.json').success(function (data) {
        $scope.states = data;
    });
    
    $scope.toggleRight = function () {
        $ionicSideMenuDelegate.toggleRight();
    };

    $scope.myVariables = {
        current_mode: 'Add'
    };

    $scope.myapplication = {};
    $scope.myscholarships = {};
    $scope.myscholarship = {};
    $scope.myuniversities = {};
    $scope.myuniversity = {};
    $scope.mychildren = {};
    $scope.mychild = {};

    // GET 
    MyApplicationService.getMyApplication($stateParams.applicationId).then(
        function (result) {
            if ($stateParams.applicationId !== "") {
                $scope.myapplication = result;
                if ($scope.myapplication.state !== undefined && $scope.myapplication.state !== null) {
                    $scope.test = $filter('filter')($scope.states, {
                        name: $scope.myapplication.state
                    }, true);
                    $scope.myVariables.myState = $scope.test[0];
                } else {
                    $scope.myVariables.myState = $scope.states[50];
                }
            }
        },
        function (error) {
            if (error.status === 0) {
                ngNotify.set("Internet or Server unavailable.", {
                    type: "error",
                    sticky: true
                });
            } else {
                ngNotify.set("Something went wrong retrieving data.", {
                    type: "error",
                    sticky: true
                });
            }
        }
    );

    // GET 
    MyUniversityService.getAllUniversity().then(
        function (result) {
            $scope.myuniversities = result;
        },
        function (error) {
            ngNotify.set("Something went wrong retrieving data.", {
                type: "error",
                sticky: true
            });
        }
    );

    // GET 
    MyScholarshipService.getAllScholarship().then(
        function (result) {
            $scope.myscholarships = result;
        },
        function (error) {
            ngNotify.set("Something went wrong retrieving data.", {
                type: "error",
                sticky: true
            });
        }
    );

    // GET 
    MyChildService.getAllChild().then(
        function (result) {
            $scope.mychildren = result;
        },
        function (error) {
            ngNotify.set("Something went wrong retrieving data.", {
                type: "error",
                sticky: true
            });
        }
    );

    // Open a popup to add data
    $scope.showAddData = function () {
        $scope.myVariables.university = '';
        var myPopup = $ionicPopup.show({
            template: '<input type="text" ng-model="myVariables.university">',
            title: 'Name University',
            subTitle: 'You can reorder the list later',
            scope: $scope,
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        if (!$scope.myVariables.university) {
                            //don't allow the user to close unless he enters wifi password
                            e.preventDefault();
                        } else {
                            $scope.myuniversity.application_id = $stateParams.applicationId;
                            $scope.myuniversity.name = $scope.myVariables.university;
                            MyUniversityService.addUniversity($scope.myuniversity).then(
                                function (success) {
                                    $scope.updateList('university');
                                }
                            );
                        }
                    }
                }
            ]
        });
    };

    // Open a modal
    $scope.showAddModal = function (type) {
        $scope.myVariables.current_mode = "Add";

        switch (type) {
        case 1:
            $scope.myscholarship = {};
            $scope.myscholarship.applied_received = 'true';
            $ionicModal.fromTemplateUrl('templates/modal_scholarship.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();
            });
            break;
        case 2:
            $scope.myscholarship = {};
            $scope.myscholarship.applied_received = 'false';
            $ionicModal.fromTemplateUrl('templates/modal_scholarship.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();
            });
            break;
        case 3:
            $scope.mychild = {};
            $ionicModal.fromTemplateUrl('templates/modal_child.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal1 = modal;
                $scope.modal1.show();
            });
            break;
        }


    };
    
    // Open a popup to edit data
    $scope.editData = function (acType, item) {
        $scope.myVariables.current_mode = "Edit";
        switch (acType) {
        case 'university':
            $scope.myuniversity = item;
            $scope.myVariables.university = $scope.myuniversity.name;
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="myVariables.university">',
                title: 'Name University',
                subTitle: 'You can reorder the list later',
                scope: $scope,
                buttons: [
                    {
                        text: 'Cancel'
                    },
                    {
                        text: '<b>Save</b>',
                        type: 'button-positive',
                        onTap: function (e) {
                            if (!$scope.myVariables.university) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                $scope.myuniversity.application_id = $stateParams.applicationId;
                                $scope.myuniversity.name = $scope.myVariables.university;
                                MyUniversityService.updateUniversity($scope.myuniversity.id, $scope.myuniversity);
                                $scope.updateList('university');
                            }
                        }
                    }
                ]
            });
            break;
        case 'scholarship':
            $scope.myscholarship = item;
            $ionicModal.fromTemplateUrl('templates/modal_scholarship.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();
            });
            break;
        case 'children':
            $scope.mychild = item;
            $ionicModal.fromTemplateUrl('templates/modal_child.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal1 = modal;
                $scope.modal1.show();
            });
            break;
        }
    };

    $scope.updateList = function (acType) {
        switch (acType) {
        case 'university':
            // GET 
            MyUniversityService.getAllUniversity().then(
                function (result) {
                    $scope.myuniversities = result;
                },
                function (error) {
                    ngNotify.set("Something went wrong retrieving data.", {
                        type: "error",
                        sticky: true
                    });
                }
            );
            break;
        case 'scholarship':
            // GET 
            MyScholarshipService.getAllScholarship().then(
                function (result) {
                    $scope.myscholarships = result;
                },
                function (error) {
                    ngNotify.set("Something went wrong retrieving data.", {
                        type: "error",
                        sticky: true
                    });
                }
            );
            break;
        case 'children':
            // GET 
            MyChildService.getAllChild().then(
                function (result) {
                    $scope.mychildren = result;
                },
                function (error) {
                    ngNotify.set("Something went wrong retrieving data.", {
                        type: "error",
                        sticky: true
                    });
                }
            );
            break;
        }
    };

    // callback for ng-click 'saveModal':
    $scope.saveModal = function (acType) {
        
        switch (acType) {
        case 'scholarship':
            $scope.myscholarship.application_id = $stateParams.applicationId;

            if ($scope.myVariables.current_mode === 'Add') {
                MyScholarshipService.addScholarship($scope.myscholarship).then(
                    function (success) {
                        $scope.updateList('scholarship');
                        $scope.modal.hide();
                    }
                );
            } else {
                MyScholarshipService.updateScholarship($scope.myscholarship.id, $scope.myscholarship).then(
                    function (success) {
                        $scope.updateList('scholarship');
                        $scope.modal.hide();
                    }
                );
            }
            break;
        case 'children':
            $scope.mychild.application_id = $stateParams.applicationId;

            if ($scope.myVariables.current_mode === 'Add') {
                MyChildService.addChild($scope.mychild).then(
                    function (success) {
                        $scope.updateList('children');
                        $scope.modal1.hide();
                    }
                );
            } else {
                MyChildService.updateChild($scope.mychild.id, $scope.mychild).then(
                    function (success) {
                        $scope.updateList('children');
                        $scope.modal1.hide();
                    }
                );
            }
            break;
        }
    };

    // callback for ng-click 'deleteData':
    $scope.deleteData = function (acType, itemId) {

        $ionicPopup.confirm({
            title: 'Confirm Delete',
            template: 'Are you sure you want to delete your course from the list?'
        }).then(function (res) {
            if (res) {
                switch (acType) {
                case 'university':
                    MyUniversityService.deleteUniversity(itemId).then(
                        function (success) {
                            $scope.updateList(acType);
                        }
                    );
                    break;
                case 'scholarship':
                    MyScholarshipService.deleteScholarship(itemId).then(
                        function (success) {
                            $scope.updateList(acType);
                        }
                    );
                    break;
                case 'children':
                    MyChildService.deleteChild(itemId).then(
                        function (success) {
                            $scope.updateList(acType);
                        }
                    );
                    break;
                }
            } else {
                console.log('You are not sure to delete');
            }
        });
    };

    $scope.pickedDates = {};

    $scope.$watch('pickedDates.birthDate', function (unformattedDate) {
        $scope.myapplication.dob = $filter('date')(unformattedDate, 'dd/MM/yyyy');
    });

    $scope.$watch('pickedDates.gradDate', function (unformattedDate) {
        $scope.myapplication.highschool_graduation_date = $filter('date')(unformattedDate, 'dd/MM/yyyy');
    });

    $scope.$watch('pickedDates.psatDate', function (unformattedDate) {
        $scope.myapplication.psat_date = $filter('date')(unformattedDate, 'dd/MM/yyyy');
    });

    $scope.$watch('pickedDates.satDate', function (unformattedDate) {
        $scope.myapplication.sat_date = $filter('date')(unformattedDate, 'dd/MM/yyyy');
    });

    $scope.$watch('pickedDates.actDate', function (unformattedDate) {
        $scope.myapplication.act_date = $filter('date')(unformattedDate, 'dd/MM/yyyy');
    });

    $scope.$watch('pickedDates.national_merit_date', function (unformattedDate) {
        $scope.myapplication.national_merit_date = $filter('date')(unformattedDate, 'dd/MM/yyyy');
    });

    $scope.$watch('pickedDates.national_achievement_date', function (unformattedDate) {
        $scope.myapplication.national_achievement_date = $filter('date')(unformattedDate, 'dd/MM/yyyy');
    });

    $scope.$watch('pickedDates.national_hispanic_date', function (unformattedDate) {
        $scope.myapplication.national_hispanic_date = $filter('date')(unformattedDate, 'dd/MM/yyyy');
    });

    $scope.openDOBPicker = function () {
        $scope.tmp = {};
        $scope.tmp.newDate = $scope.pickedDates.birthDate;

        var birthDatePopup = $ionicPopup.show({
            template: '<datetimepicker data-ng-model="tmp.newDate"></datetimepicker>',
            title: "Birth date",
            scope: $scope,
            buttons: [
                {
                    text: 'Cancel'
                },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        $scope.pickedDates.birthDate = $scope.tmp.newDate;
                    }
                }
            ]
        });
    };

    $scope.openTestDatePicker = function (testvar) {
        $scope.tmp = {};
        $scope.tmp.newDate = $scope.pickedDates.birthDate;

        var birthDatePopup = $ionicPopup.show({
            template: '<datetimepicker data-ng-model="tmp.newDate"></datetimepicker>',
            title: "Date of Test",
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
                            $scope.pickedDates.gradDate = $scope.tmp.newDate;
                            break;
                        case 2:
                            $scope.pickedDates.psatDate = $scope.tmp.newDate;
                            break;
                        case 3:
                            $scope.pickedDates.satDate = $scope.tmp.newDate;
                            break;
                        case 4:
                            $scope.pickedDates.actDate = $scope.tmp.newDate;
                            break;
                        case 5:
                            $scope.pickedDates.national_merit_date = $scope.tmp.newDate;
                            break;
                        case 6:
                            $scope.pickedDates.national_achievement_date = $scope.tmp.newDate;
                            break;
                        case 7:
                            $scope.pickedDates.national_hispanic_date = $scope.tmp.newDate;
                            break;
                        default:
                            //need to define a default
                        }
                    }
                }
            ]
        });
    };

    // callback for ng-submit 'save': save application updates to server
    $scope.save = function (nextstate) {
        $scope.myapplication.state = $scope.myVariables.myState.name;

        MyApplicationService.updateMyApplication($scope.myapplication.id, $scope.myapplication).then(
            function (result) {
                ngNotify.set("Saved to server.", {
                    position: 'bottom',
                    type: 'success'
                });
                //if succesful => send to next page
                $state.go(nextstate);
            },
            function (error) {
                ngNotify.set("Could not contact server to save application!", {
                    position: 'bottom',
                    type: 'error'
                });

            }
        );
    };
});