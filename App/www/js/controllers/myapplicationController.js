/*global angular, console*/

/**
 * @ngdoc function
 * @name myapplication.controller:MyApplicationController
 * @description
 * # MyApplicationController
 * Controller for the terry
 */
angular.module('TerryControllers').controller('MyApplicationController', function ($scope, $http, Restangular, ngNotify, $stateParams, $state, $filter, $ionicSideMenuDelegate, $ionicModal, $ionicPopup, MyApplicationService, MyEmploymentService, MyCourseworkService, MyUniversityService, MyScholarshipService, MyChildService) {
    'use strict';

    $scope.mail_options = [
        {
            "name": "online"
        },
        {
            "name": "US mail"
        }
    ];

    //Load some variables
    $http.get('json/states.json').success(function (data) {
        $scope.states = data;
    });

    $scope.toggleRight = function () {
        $ionicSideMenuDelegate.toggleRight();
    };

    $scope.myVariables = {
        current_mode: 'Add',
        number_errors: 0,
        error: 'false',
        error_employment: 'false'
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
            result = Restangular.stripRestangular(result);
            if ($stateParams.applicationId !== "") {
                $scope.myapplication = result;
                //set selected state
                if ($scope.myapplication.state !== undefined && $scope.myapplication.state !== null) {
                    $scope.test = $filter('filter')($scope.states, {
                        name: $scope.myapplication.state
                    }, true);
                    $scope.myVariables.myState = $scope.test[0];
                } else {
                    $scope.myVariables.myState = $scope.states[50];
                }
                //set selected mail options
                if ($scope.myapplication.app_uh_method !== undefined && $scope.app_uh_method !== null) {
                    $scope.test = $filter('filter')($scope.mail_options, {
                        name: $scope.myapplication.app_uh_method
                    }, true);
                    $scope.myVariables.myuhappMailOption = $scope.test[0];
                } else {
                    $scope.myVariables.myuhappMailOption = $scope.mail_options[0];
                }
                if ($scope.myapplication.transcript_method !== undefined && $scope.transcript_method !== null) {
                    $scope.test = $filter('filter')($scope.mail_options, {
                        name: $scope.myapplication.transcript_method
                    }, true);
                    $scope.myVariables.mytranscriptMailOption = $scope.test[0];
                } else {
                    $scope.myVariables.mytranscriptMailOption = $scope.mail_options[0];
                }
                if ($scope.myapplication.fafsa_method !== undefined && $scope.fafsa_method !== null) {
                    $scope.test = $filter('filter')($scope.mail_options, {
                        name: $scope.myapplication.fafsa_method
                    }, true);
                    $scope.myVariables.myfafsaMailOption = $scope.test[0];
                } else {
                    $scope.myVariables.myfafsaMailOption = $scope.mail_options[0];
                }
                if ($scope.myapplication.housing_method !== undefined && $scope.housing_method !== null) {
                    $scope.test = $filter('filter')($scope.mail_options, {
                        name: $scope.myapplication.housing_method
                    }, true);
                    $scope.myVariables.myhousingMailOption = $scope.test[0];
                } else {
                    $scope.myVariables.myhousingMailOption = $scope.mail_options[0];
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

    $scope.openDatePicker = function (title, acType) {
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
                        $scope.myapplication[acType] = test;
                    }
                }
            ]
        });
    };

    // callback for ng-submit 'check': check application 
    $scope.check = function () {
        //save data to server
        $scope.myapplication.app_uh_method = $scope.myVariables.myuhappMailOption.name;
        $scope.myapplication.transcript_method = $scope.myVariables.mytranscriptMailOption.name;
        $scope.myapplication.fafsa_method = $scope.myVariables.myfafsaMailOption.name;
        $scope.myapplication.housing_method = $scope.myVariables.myhousingMailOption.name;

        MyApplicationService.updateMyApplication($scope.myapplication.id, $scope.myapplication).then(
            function (result) {
                ngNotify.set("Saved to server.", {
                    position: 'bottom',
                    type: 'success'
                });
                //if succesful => send to next page

            },
            function (error) {
                ngNotify.set("Could not contact server to save application!", {
                    position: 'bottom',
                    type: 'error'
                });

            }
        );
        //check the lists for not empty
        var myemployments;
        
        // GET 
        MyEmploymentService.getAllEmployment().then(
            function (result) {
                myemployments = result;
                if (Object.keys(myemployments).length === 0) {
                    $scope.myVariables.error_employment = 'true';
                }
            },
            function (error) {
                ngNotify.set("Something went wrong retrieving data.", {
                    type: "error",
                    sticky: true
                });
            }
        );

        //check 
        var toTest = $scope.myapplication,
            len = Object.keys(toTest).length;

        if (!Object.keys) {
            Object.keys = function (toTest) {
                var keys = [],
                    k;
                for (k in $scope.myapplication) {
                    if (Object.prototype.hasOwnProperty.call(toTest, k)) {
                        keys.push(k);
                    }
                }
                return keys;
            };
        }

        $scope.myVariables.number_errors = 116 - len;

        if ($scope.myVariables.number_errors !== 0) {
            $scope.myVariables.error = 'true';
        }

        //display result of check
        $ionicModal.fromTemplateUrl('templates/modal_check.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
    };

    $scope.checked = function (nextstate) {

        $scope.modal.hide();
        if ($scope.myVariables.error === 'false') {
            $state.go(nextstate);
        }
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

    $scope.mail_options = [
        {
            "name": "online"
        },
        {
            "name": "US mail"
        }
    ];
});