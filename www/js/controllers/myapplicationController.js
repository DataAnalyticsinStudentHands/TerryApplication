/*global angular, console*/
/*jslint plusplus: true */

/**
 * @ngdoc function
 * @name myapplication.controller:MyApplicationController
 * @description
 * # MyApplicationController
 * Controller for the terry
 */
angular.module('TerryControllers').controller('MyApplicationController', function ($scope, $http, $q, Restangular, ngNotify, $stateParams, $state, $filter, $ionicSideMenuDelegate, $ionicModal, $ionicPopup, ApplicationService, DataService, UserService) {
    'use strict';

    $scope.date = new Date();

    $scope.user = {};

    UserService.getUser().then(
        function (result) {
            result = Restangular.stripRestangular(result)[0];
            $scope.user = result;
        },
        function (error) {}
    );

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

    $http.get('json/form_application.json').success(function (data) {
        $scope.formObjects = data;
    });

    $scope.toggleRight = function () {
        $ionicSideMenuDelegate.toggleRight();
    };

    $scope.myVariables = {
        current_mode: 'Add',
        problems: 'false'
    };

    $scope.myapplication = {};
    $scope.myscholarships = {};
    $scope.myuniversities = {};
    $scope.mychildren = {};

    // GET 
    ApplicationService.getApplication($stateParams.applicationId).then(
        function (result) {
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
        }
    );

    // GET 
    DataService.getAllItems('university').then(
        function (result) {
            $scope.myuniversities = result;
        }
    );

    // GET 
    DataService.getAllItems('scholarship').then(
        function (result) {
            $scope.myscholarships = result;
        }
    );

    // GET 
    DataService.getAllItems('child').then(
        function (result) {
            $scope.mychildren = result;
        }
    );

    // Open a popup to add data
    $scope.showAddData = function (acType) {
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
                            $scope.myuniversity = {};
                            $scope.myuniversity.application_id = $stateParams.applicationId;
                            $scope.myuniversity.name = $scope.myVariables.university;
                            $scope.myuniversity.rank = $scope.myuniversities.length;
                            DataService.addItem(acType, $scope.myuniversity).then(
                                function (success) {
                                    $scope.updateList(acType);
                                }
                            );
                        }
                    }
                }
            ]
        });
    };

    // callback for ng-click 'showAddModal':
    $scope.showAddModal = function (acType, applied_received) {

        $scope.myVariables.current_mode = "Add";
        $scope.myscholarship = {};
        $scope.mychild = {};

        if (applied_received !== undefined) {
            $scope.myscholarship.applied_received = applied_received;
            if (applied_received) {
                $scope.myVariables.label_name = "";
            } else {
                $scope.myVariables.label_name = " or Grant";

            }
        }

        $ionicModal.fromTemplateUrl('templates/modal_' + acType + '.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
    };

    // callback for ng-click 'editData'
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
                                DataService.updateItem(acType, $scope.myuniversity.id, $scope.myuniversity);
                                $scope.updateList(acType);
                            }
                        }
                    }
                ]
            });
            break;
        case 'scholarship':
            $scope.myscholarship = item;
            if ($scope.myscholarship.applied_received) {
                $scope.myVariables.label_name = "";
            } else {
                $scope.myVariables.label_name = " or Grant";
            }
            $ionicModal.fromTemplateUrl('templates/modal_scholarship.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();
            });
            break;
        case 'child':
            $scope.mychild = item;
            $ionicModal.fromTemplateUrl('templates/modal_child.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();
            });
            break;
        }
    };

    $scope.updateList = function (acType) {
        switch (acType) {
        case 'university':
            // GET 
            DataService.getAllItems(acType).then(
                function (result) {
                    $scope.myuniversities = result;
                }
            );
            break;
        case 'scholarship':
            // GET 
            DataService.getAllItems(acType).then(
                function (result) {
                    $scope.myscholarships = result;
                }
            );
            break;
        case 'child':
            // GET 
            DataService.getAllItems(acType).then(
                function (result) {
                    $scope.mychildren = result;
                }
            );
            break;
        }
    };

    $scope.data = {
        showReorder: false
    };

    //reorder items in a list
    $scope.moveItem = function (item, fromIndex, toIndex) {
        $scope.myuniversities.splice(fromIndex, 1);
        $scope.myuniversities.splice(toIndex, 0, item);
        var i, l;
        for (i = 0, l = $scope.myuniversities.length; i < l; i++) {
            $scope.myuniversities[i].rank = i;
            var test = $scope.myuniversities[i];
            DataService.updateItem('university', $scope.myuniversities[i].id, $scope.myuniversities[i]);
        }
        $scope.updateList('university');
        
    };

    // callback for ng-click 'saveModal':
    $scope.saveModal = function (acType) {

        switch (acType) {
        case 'scholarship':
            $scope.myscholarship.application_id = $stateParams.applicationId;

            if ($scope.myVariables.current_mode === 'Add') {
                DataService.addItem(acType, $scope.myscholarship).then(
                    function (success) {
                        $scope.updateList(acType);
                        $scope.modal.hide();
                    }
                );
            } else {
                DataService.updateItem(acType, $scope.myscholarship.id, $scope.myscholarship).then(
                    function (success) {
                        $scope.modal.hide();
                    }
                );
            }
            break;
        case 'child':
            $scope.mychild.application_id = $stateParams.applicationId;

            if ($scope.myVariables.current_mode === 'Add') {
                DataService.addItem(acType, $scope.mychild).then(
                    function (success) {
                        $scope.updateList(acType);
                        $scope.modal.hide();
                    }
                );
            } else {
                DataService.updateItem(acType, $scope.mychild.id, $scope.mychild).then(
                    function (success) {
                        $scope.modal.hide();
                    }
                );
            }
            break;
        }
    };

    // callback for ng-click 'deleteData':
    $scope.deleteData = function (acType, item_id) {

        $ionicPopup.confirm({
            title: 'Confirm Delete',
            template: 'Are you sure you want to delete your ' + acType + ' item from the list?'
        }).then(function (res) {
            if (res) {
                DataService.deleteItem(acType, item_id).then(
                    function (success) {
                        $scope.updateList(acType);
                    }
                );
            } else {
                console.log('Delete canceled.');
            }
        });
    };

    $scope.openDatePicker = function (title, acType) {
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
                        var test = $filter('date')($scope.tmp.newDate, 'MM/dd/yyyy');
                        $scope.myapplication[acType] = test;
                    }
                }
            ]
        });
    };


    $scope.saveToserver = function () {
        //save data to server
        $scope.myapplication.app_uh_method = $scope.myVariables.myuhappMailOption.name;
        $scope.myapplication.transcript_method = $scope.myVariables.mytranscriptMailOption.name;
        $scope.myapplication.fafsa_method = $scope.myVariables.myfafsaMailOption.name;
        $scope.myapplication.housing_method = $scope.myVariables.myhousingMailOption.name;

        ApplicationService.updateApplication($scope.myapplication.id, $scope.myapplication).then(
            function (result) {
                //do nothing
            },
            function (error) {
                ngNotify.set("Could not contact server to save application!", {
                    position: 'bottom',
                    type: 'error'
                });

            }
        );
    };

    $scope.filterBy = function (type) {
        return $scope.formObjects.filter(function (obj) {
            return obj.form === type;
        });
    };

    $scope.testFunction = function (something) {

    };

    // callback for ng-submit 'check': check application 
    $scope.check = function () {
        $scope.saveToserver();

        $scope.errors = {};
        $scope.error = {};

        //check using form.json
        var i, j, l, k, key, objectsToCheck, obj, thingsToCheck = ['student_information', 'highschool_information', 'college_plans', 'financial_information', 'scholarship_information'];

        for (i = 0, l = thingsToCheck.length; i < l; i++) {
            objectsToCheck = $scope.filterBy(thingsToCheck[i]);

            $scope.errors[thingsToCheck[i]] = [];
            for (key in objectsToCheck) {
                if (objectsToCheck.hasOwnProperty(key)) {
                    obj = objectsToCheck[key];

                    if (obj.required === 'true') {
                        if (!$scope.myapplication.hasOwnProperty(obj.name)) {
                            $scope.errors[thingsToCheck[i]].push(obj.name);
                        }
                    }
                }
            }

            if ($scope.errors[thingsToCheck[i]].length > 0) {
                $scope.error[thingsToCheck[i]] = 'true';
            }
        }

        //check the lists for not empty
        var listsToCheck = ['activity', 'award', 'child', 'coursework', 'employment', 'scholarship', 'university', 'volunteer'];
        var listPromises = [];
        $scope.listerror = {};

        for (j = 0, k = listsToCheck.length; j < k; j++) {
            listPromises.push(DataService.getAllItems(listsToCheck[j]).then(
                function (result) {
                    $scope.listerror[result.type] = 'false';
                    if (result.length === 0) {
                        $scope.listerror[result.type] = 'true';
                    }

                    //we should check courses at each level
                    if (result.type === 'coursework') {

                        console.log("course " + result);
                    }
                }
            ));
        }

        //after checking individual lists, sift through the results
        $scope.fromThen = $q.all(listPromises)
            .then(function (values) {

                //check coursework page TODO


                //check employment page
                var i, l, goThroughLists = ['activity', 'award', 'employment', 'volunteer'];
                $scope.errors.employment = [];
                for (i = 0, l = goThroughLists.length; i < l; i++) {
                    if ($scope.listerror[goThroughLists[i]] === 'true') {
                        $scope.error.employment = 'true';
                        $scope.errors.employment.push(goThroughLists[i]);
                    }
                }

                //additional check for college plans page: list universities
                if ($scope.listerror.university === 'true') {
                    $scope.error.college_plans = 'true';
                    if ($scope.errors.college_plans === undefined) {
                        $scope.errors.college_plans = [];
                    }
                    $scope.errors.college_plans.push('university list');
                }

                //update general problems value
                for (var value in $scope.error) {
                    if ($scope.error[value] === 'true') {
                        $scope.myVariables.problems = 'true';
                    }
                }

                //display result of check
                $ionicModal.fromTemplateUrl('templates/modal_check.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
                return values;
            });
    };

    $scope.checked = function (nextstate) {

        $scope.modal.hide();
        if ($scope.myVariables.problems === 'false') {
            $state.go(nextstate);
        }
    };

    // callback for ng-submit 'save': save application updates to server
    $scope.confirmation = function () {
        $scope.myapplication.status = "submitted";

        ApplicationService.updateApplication($scope.myapplication.id, $scope.myapplication).then(
            function (result) {
                ngNotify.set("Saved to server.", {
                    position: 'bottom',
                    type: 'success'
                });
                //if succesful => send to next page
                $state.go('tabs.myapplications');
            },
            function (error) {
                ngNotify.set("Could not contact server to save application!", {
                    position: 'bottom',
                    type: 'error'
                });
            }
        );
    };
    
    //detect state change from sidemenu
    $scope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        $scope.save(toState);
        
    });

    // callback for ng-submit 'save': save application updates to server
    $scope.save = function (nextstate) {
        $scope.myapplication.state = $scope.myVariables.myState.name;
        if ($scope.myapplication.citizen !== undefined && $scope.myapplication.citizen === 'true') {
            $scope.myapplication.permanent_resident = 'false';
            $scope.myapplication.permanent_resident_card = 'false';
        }

        ApplicationService.updateApplication($scope.myapplication.id, $scope.myapplication).then(
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