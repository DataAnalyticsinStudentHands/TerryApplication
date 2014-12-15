/*global angular, console*/
/*jslint plusplus: true */

/**
 * @ngdoc function
 * @name myapplication.controller:MyApplicationController
 * @description
 * # MyApplicationController
 * Controller for the terry
 */
angular.module('Controllers').controller('MyApplicationController', function ($scope, $http, $q, Restangular, ngNotify, $stateParams, $state, $filter, $ionicSideMenuDelegate, $ionicModal, $ionicPopup, ApplicationService, DataService, application, universities, scholarships, child, institutions, employment, military, transfer_activity, volunteer, award) {
    'use strict';

    $scope.date = new Date();

    $scope.mail_options = [
        {
            "name": "online"
        },
        {
            "name": "US mail"
        }
    ];
    
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

    $scope.myapplication = application;
    
    $scope.myVariables = {
        curent_mode: 'freshman',
        current_modal_mode: 'Add',
        problems: 'false'
    };
    
    if ($state.current.name.charAt(18) !== 't') {
        $scope.myVariables.current_mode = 'freshman';
    } else {
        $scope.myVariables.current_mode = 'transfer';
    }
    
    $scope.states = DataService.getStates();
    
    //variables for lists
    $scope.lists = {};
    $scope.listings = {};
    $scope.listings.universities = universities;
    $scope.listings.scholarships = scholarships;
    $scope.listings.child = child;
    $scope.listings.institution = institutions;
    $scope.listings.employment = employment;
    $scope.listings.military = employment;
    $scope.listings.transfer_activity = transfer_activity;
    $scope.listings.volunteer= volunteer;
    $scope.listings.award = award;
    
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

    // Open a popup to add universities
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
                            //don't allow the user to close unless he enters something
                            e.preventDefault();
                        } else {
                            $scope.myuniversity = {};
                            $scope.myuniversity.application_id = $stateParams.applicationId;
                            $scope.myuniversity.name = $scope.myVariables.university;
                            $scope.myuniversity.rank = $scope.myuniversities.length;
                            DataService.addItem(acType, $scope.myuniversity).then(
                                function (success) {
                                    updateList(acType);
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

        $scope.myVariables.current_modal_mode = "Add";
        $scope.lists[acType] = {};

        $ionicModal.fromTemplateUrl('templates/modal/modal_' + acType + '.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });
    };

    // callback for ng-click 'editData'
    $scope.editData = function (acType, item) {
        $scope.myVariables.current_modal_mode = "Edit";
        if (acType === 'university') {
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
                                updateList(acType);
                            }
                        }
                    }
                ]
            });
        } else {
            $scope.lists[acType] = item;
            $ionicModal.fromTemplateUrl('templates/modal/modal_' + acType + '.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();
            });
        }           
    };
    
    // callback for ng-click 'saveModal':
    $scope.saveModal = function (acType) {
        
        $scope.lists[acType].application_id = $stateParams.applicationId;
        
        if ($scope.lists[acType].award !== undefined)
            $scope.lists[acType].year = angular.toJson($scope.yearInSchoolList);
        
        if ($scope.myVariables.current_mode === 'transfer')
            $scope.lists[acType].transfer = true;
        else
            $scope.lists[acType].transfer = false;

        if ($scope.myVariables.current_modal_mode === 'Add') {
            DataService.addItem(acType, $scope.lists[acType]).then(
                function (success) {
                    updateList(acType);
                    $scope.modal.hide();
                }
            );
        } else {
            DataService.updateItem(acType, $scope.lists[acType].id, $scope.lists[acType]).then(
                function (success) {
                    updateList(acType);
                    $scope.modal.hide();
                }
            );
        }
    };

    function updateList(acType) {
        // GET 
        DataService.getAllItems(acType).then(
            function (result) {
                $scope.listings[acType] = result;
            }
        );
    }

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
            DataService.updateItem('university', $scope.myuniversities[i].id, $scope.myuniversities[i]);
        }
        updateList('university');
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
                        updateList(acType);
                    }
                );
            } else {
                console.log('Delete canceled.');
            }
        });
    };

    $scope.openDatePicker = function (title, acType, variable) {
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
                        if (variable !== undefined) {
                            $scope.lists[acType][variable] = test;
                        } else {
                            $scope.myapplication[acType] = test;
                        }
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
        var formObjects = DataService.getForm('application');
        return formObjects.filter(function (obj) {
            return obj.form === type;
        });
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
        var listsToCheck = ['activity', 'award', 'child', 'coursework', 'employment', 'scholarship', 'university', 'volunteer'],
            listPromises = [];
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
        
        //check whether essays have been put in
        listPromises.push(ApplicationService.getListofDocuments($stateParams.applicationId).then(
            function (result) {
                if (result.fileName.length < 2) {
                    $scope.error.essay = 'true';
                    $scope.errors.essay = [];
                    $scope.errors.essay.push('One of the essays is missing.');
                }
            }
        ));

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
            
                //check the submission page
                var j, k, goThrough = ['app_uh_date_sub', 'app_uh_date_int_sub', 'transcript_date_sub', 'transcript_date_int_sub', 'fafsa_date_sub', 'fafsa_date_int_sub', 'housing_date_sub', 'housing_date_int_sub'];
                $scope.errors.submission = [];
                for (j = 0, k = goThrough.length; j < k; j++) {
                    if ($scope.myapplication[goThrough[j]] === undefined) {
                        $scope.error.submission = 'true';
                        $scope.errors.submission.push(goThrough[j]);
                    }
                }
            
                
                

                //update general problems value
                var value;
                for (value in $scope.error) {
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
                $state.go('tabs.applications');
            },
            function (error) {
                ngNotify.set("Could not contact server to save application!", {
                    position: 'bottom',
                    type: 'error'
                });
            }
        );
    };

    // callback for ng-submit 'next': moves to next state
    $scope.next = function () {
        $scope.myapplication.state = $scope.myVariables.myState.name;
        if ($scope.myapplication.citizen !== undefined && $scope.myapplication.citizen === 'true') {
            $scope.myapplication.permanent_resident = 'false';
            $scope.myapplication.permanent_resident_card = 'false';
        }

        //store data to local storage
        if ($state.current.name.charAt(18) !== 't') {
            DataService.storeItem('application', $scope.myapplication);
                 
        } else {
            DataService.storeItem('transferApplication', $scope.myapplication);   
        }
        
        //logic for next state
        switch ($state.current.name) {
            //freshaman app
            case 'tabs.applications.application.student_information':
                $state.go('tabs.applications.application.highschool_information');
                break;
            case 'tabs.applications.application.highschool_information':
                $state.go('tabs.applications.application.employment');
                break;
            case 'tabs.applications.application.employment':
                $state.go('tabs.applications.application.college_plans');
                break;
            case 'tabs.applications.application.college_plans':
                $state.go('tabs.applications.application.financial_information');
                break;
            case 'tabs.applications.application.financial_information':
                $state.go('tabs.applications.application.scholarship_information');
                break;
            case 'tabs.applications.application.scholarship_information':
                $state.go('tabs.applications.application.essays');
                break;
            case 'tabs.applications.application.essays':
                $state.go('tabs.applications.application.submit');
                break;
            case 'tabs.applications.application.submit':
                $state.go('tabs.applications.application.confirmation');
                break;
            //transfer app
            case 'tabs.applications.transfer_application.student_information':
                $state.go('tabs.applications.transfer_application.education');
                break;
            case 'tabs.applications.transfer_application.education':
                $state.go('tabs.applications.transfer_application.employment');
                break;
            case 'tabs.applications.transfer_application.employment':
                $state.go('tabs.applications.transfer_application.financial_information');
                break;
            default:
                $state.go('signin');
                break;
        }
    };
    
    function cleanOut() {
        //clean out
        if ($scope.myapplication.highschool_graduation_date === "") {
            delete $scope.myapplication.highschool_graduation_date;
        } else if ($scope.myapplication.highschool_graduation_date === "NA") {
            $scope.myapplication.highschool_graduation_date_na = true;
        } else {
            $scope.myapplication.highschool_graduation_date_na = false;
        }
    }
    
    // callback for ng-submit 'save': save application updates to server
    $scope.save = function () {
        
        cleanOut();
        
        $scope.myapplication.state = $scope.myVariables.myState.name;
        if ($scope.myapplication.citizen !== undefined && $scope.myapplication.citizen === 'true') {
            $scope.myapplication.permanent_resident = 'false';
            $scope.myapplication.permanent_resident_card = 'false';
        }
        
        if ($state.current.name.charAt(18) !== 't') {
            DataService.updateItem('application', $scope.myapplication.id, $scope.myapplication);
        } else {
            DataService.updateItem('transferApplication', $scope.myapplication.id, $scope.myapplication);
        }
    };
});