/*global angular, console*/
/*jslint plusplus: true */

/**
 * @ngdoc function
 * @name myapplication.controller:MyApplicationController
 * @description
 * # MyApplicationController
 * Controller for the terry
 */
angular.module('Controllers').controller('MyApplicationController', function ($scope, $http, $q, Restangular, ngNotify, $stateParams, $state, $filter, $ionicSideMenuDelegate, $ionicModal, $ionicPopup, DataService, application, activity, coursework, university, scholarship, child, institution, employment, military, transfer_activity, volunteer, award) {
    'use strict';

    $scope.date = new Date();

    $scope.mail_options = [
        {
            "id": "online",
            "name": "online"
        },
        {
            "id": "US mail",
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
        current_modal_mode: 'Add',
        problems: 'false'
    };

    //variables for selectors
    $scope.states = DataService.getStates();
    if ($scope.myapplication.state === undefined) {
        $scope.myapplication.state = 'Texas';
    }
    
    $scope.marital_statuses = DataService.getMarital_statuses();
    if ($scope.myapplication.marital_status === undefined) {
        $scope.myapplication.marital_status = 'Single';
    }
    
    $scope.grades = DataService.getGrades();
    $scope.course_types = DataService.getCourseTypes();

    //variables for lists
    $scope.lists = {};
    $scope.listings = {};
    $scope.listings.activity = activity;
    $scope.listings.coursework = coursework;
    $scope.listings.university = university;
    $scope.listings.scholarship = scholarship;
    $scope.listings.child = child;
    $scope.listings.institution = institution;
    $scope.listings.employment = employment;
    $scope.listings.military = military;
    $scope.listings.transfer_activity = transfer_activity;
    $scope.listings.volunteer = volunteer;
    $scope.listings.award = award;

    //list of things that should be checked for NA values, so we can set the visible values to "NA"   
    $scope.thingsToNA = ['highschool_graduation_date',
                            'app_uh_date_sub',
                            'app_uh_date_int_sub',
                            'fafsa_date_sub',
                            'fafsa_date_int_sub',
                            'transcript_date_sub',
                            'transcript_date_int_sub',
                            'housing_date_sub',
                            'housing_date_int_sub'
                           ];
    if ($stateParams.appType === 'transfer') {
        $scope.thingsToNA = ['highschool_graduation_date',
                'highschool_ged_date',
                'app_uh_date_sub',
                'app_uh_date_int_sub',
                'fafsa_date_sub',
                'fafsa_date_int_sub',
                'transcript_date_sub',
                'transcript_date_int_sub',
                'housing_date_sub',
                'housing_date_int_sub'
               ];
    }


    for (var i = 0, l = $scope.thingsToNA.length; i < l; i++) {
        var NA_variable = $scope.thingsToNA[i] + '_na';
        if ($scope.myapplication[NA_variable] === 'true') {
            $scope.myapplication[$scope.thingsToNA[i]] = "NA";
        }
    }

    // callback for ng-click 'showAddModal':
    $scope.showAddModal = function (acType, applied_received, level) {

        $scope.myVariables.current_modal_mode = "Add";
        $scope.lists[acType] = {};

        if (applied_received !== undefined && applied_received !== null) {
            $scope.lists[acType].applied_received = applied_received;
        }

        if (level !== undefined) {
            $scope.lists[acType].level = level;
            $scope.lists[acType].final_grade = 'A';
            $scope.lists[acType].type = 'AP';
        }

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
        $scope.lists[acType] = item;

        $ionicModal.fromTemplateUrl('templates/modal/modal_' + acType + '.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.modal = modal;
            $scope.modal.show();
        });

    };

    // callback for ng-click 'saveModal':
    $scope.saveModal = function (acType) {

        $scope.lists[acType].application_id = $stateParams.applicationId;

        if (acType === 'activity' || acType === 'award')
            $scope.lists[acType].year = angular.toJson($scope.yearInSchoolList);

        if (acType === 'university')
            $scope.lists[acType].rank = $scope.listings.university.length;

        //set the type of application
        if ($stateParams.appType === 'transfer')
            $scope.lists[acType].transfer = true;
        else
            $scope.lists[acType].transfer = false;

        //take care of NA values in dates
        var datesToNA = ['date_to', 'date_from'];
        cleanOutLists(acType, datesToNA);

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
        $scope.listings.university.splice(fromIndex, 1);
        $scope.listings.university.splice(toIndex, 0, item);
        var i, l,
            listPromises = [];
        for (i = 0, l = $scope.listings.university.length; i < l; i++) {
            $scope.listings.university[i].rank = i;
            listPromises.push(DataService.updateItem('university', $scope.listings.university[i].id, $scope.listings.university[i]));
        }
        
        var test = $q.all(listPromises)
            .then(function (success) {
                updateList('university');
        });
        
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

    $scope.filterBy = function (type) {
        var formObjects = DataService.getForm('application');
        return formObjects.filter(function (obj) {
            return obj.form === type;
        });
    };

    // callback for ng-submit 'check': check application 
    $scope.checkFreshmanApp = function () {
        //save data to server
        $scope.save();

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

                    /*we should check courses at each level
                    if (result.type === 'coursework') {

                        
                    }*/
                }
            ));
        }

        //check whether essays have been put in
        listPromises.push(DataService.getListofDocuments('application', $stateParams.applicationId).then(
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
                var j, k, goThrough = ['app_uh', 'transcript', 'fafsa', 'housing'];
            
            var orig = ['app_uh_date_sub', 'app_uh_date_int_sub', 'transcript_date_sub', 'transcript_date_int_sub', 'fafsa_date_sub', 'fafsa_date_int_sub', 'housing_date_sub', 'housing_date_int_sub'];
                $scope.errors.submission = [];
                for (j = 0, k = goThrough.length; j < k; j++) {
                    var toTest = goThrough[j] + '_method';
                    if ($scope.myapplication[toTest] === undefined) {
                        $scope.error.submission = 'true';
                        $scope.errors.submission.push(toTest);
                    }
                    var subDate = goThrough[j] + '_date_sub';
                    var intDate = goThrough[j] + '_date_int_sub';
                    if ($scope.myapplication[subDate] === undefined && $scope.myapplication[subDate] === undefined) {
                        $scope.error.submission = 'true';
                        $scope.errors.submission.push('Missing ' + subDate + ' or ' + subDate);
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
                $ionicModal.fromTemplateUrl('templates/modal/modal_check.html', {
                    scope: $scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    $scope.modal = modal;
                    $scope.modal.show();
                });
                return values;
            });
    };

    // callback for ng-submit 'check': check application 
    $scope.checkTransferApp = function () {
        
        $scope.save();

        $scope.errors = {};
        $scope.error = {};

        //check using form.json
        var i, j, l, k, key, objectsToCheck, obj, thingsToCheck = ['student_information', 'education', 'financial_information', 'personal_history'];

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
        var listsToCheck = ['transfer_activity', 'award', 'child', 'employment', 'university', 'volunteer'],
            listPromises = [];
        $scope.listerror = {};

        for (j = 0, k = listsToCheck.length; j < k; j++) {
            listPromises.push(DataService.getAllItems(listsToCheck[j]).then(
                function (result) {
                    $scope.listerror[result.type] = 'false';
                    if (result.length === 0) {
                        $scope.listerror[result.type] = 'true';
                    }

                    /*we should check courses at each level
                    if (result.type === 'coursework') {

                        
                    }*/
                }
            ));
        }

        //check whether essay has been put in
        listPromises.push(DataService.getListofDocuments('transferApplication', $stateParams.applicationId).then(
            function (result) {
                if (result.fileName.length < 1) {
                    $scope.error.essay = 'true';
                    $scope.errors.essay = [];
                    $scope.errors.essay.push('Your essay is missing.');
                }
            }
        ));

        //after checking individual lists, sift through the results
        $scope.fromThen = $q.all(listPromises)
            .then(function (values) {

                //check coursework page TODO


                //check employment page
                var i, l, goThroughLists = ['transfer_activity', 'award', 'employment', 'volunteer'];
                $scope.errors.employment = [];
                for (i = 0, l = goThroughLists.length; i < l; i++) {
                    if ($scope.listerror[goThroughLists[i]] === 'true') {
                        $scope.error.employment = 'true';
                        $scope.errors.employment.push(goThroughLists[i]);
                    }
                }

                //check the submission page
                var j, k, goThrough = ['app_uh', 'transcript', 'fafsa', 'housing'];
            
            var orig = ['app_uh_date_sub', 'app_uh_date_int_sub', 'transcript_date_sub', 'transcript_date_int_sub', 'fafsa_date_sub', 'fafsa_date_int_sub', 'housing_date_sub', 'housing_date_int_sub'];
                $scope.errors.submission = [];
                for (j = 0, k = goThrough.length; j < k; j++) {
                    var toTest = goThrough[j] + '_method';
                    if ($scope.myapplication[toTest] === undefined) {
                        $scope.error.submission = 'true';
                        $scope.errors.submission.push(toTest);
                    }
                    var subDate = goThrough[j] + '_date_sub';
                    var intDate = goThrough[j] + '_date_int_sub';
                    if ($scope.myapplication[subDate] === undefined && $scope.myapplication[intDate] === undefined) {
                        $scope.error.submission = 'true';
                        $scope.errors.submission.push('Missing ' + subDate + ' or ' + intDate);
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
                $ionicModal.fromTemplateUrl('templates/modal/modal_check_transfer.html', {
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

        var acType;

        if ($stateParams.appType === 'Freshman')
            acType = 'application';
        else
            acType = 'transferApplication';

        DataService.updateItem(acType, $scope.myapplication.id, $scope.myapplication).then(
            function (result) {
                ngNotify.set("Saved to server.", {
                    position: 'bottom',
                    type: 'success'
                });
                //if succesful => send to next page
                $state.go('tabs.applications', {}, {
                    reload: true
                });
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
        //save some data
        if ($scope.myapplication.citizen !== undefined && $scope.myapplication.citizen === 'true') {
            $scope.myapplication.permanent_resident = 'false';
            $scope.myapplication.permanent_resident_card = 'false';
        }
        
        //store data to local storage
        if ($stateParams.appType === 'freshman') {
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
            $state.go('tabs.applications.application.highschool_coursework');
            break;
        case 'tabs.applications.application.highschool_coursework':
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
        case 'tabs.applications.transfer_application.financial_information':
            $state.go('tabs.applications.transfer_application.personal_history');
            break;
        case 'tabs.applications.transfer_application.personal_history':
            $state.go('tabs.applications.transfer_application.essay');
            break;
        case 'tabs.applications.transfer_application.essay':
            $state.go('tabs.applications.transfer_application.submit');
            break;
        default:
            $state.go('signin');
            break;
        }
    };

    //taking care of NA values in list data
    function cleanOutLists(acType, thingsToNA) {

        //list of things that should be checked for NA values, so we can update the variables in the database
        for (i = 0, l = thingsToNA.length; i < l; i++) {
            if ($scope.lists[acType][thingsToNA[i]] !== undefined) {
                var NA_variable = thingsToNA[i] + '_na';
                if ($scope.lists[acType][thingsToNA[i]] === "") {
                    delete $scope.lists[acType][thingsToNA[i]];
                    $scope.lists[acType][NA_variable] = false;
                } else if ($scope.lists[acType][thingsToNA[i]] === "NA") {
                    $scope.lists[acType][NA_variable] = true;
                } else {
                    $scope.lists[acType][NA_variable] = false;
                }
            }
        }
    }


    //taking care of NA values in application
    function cleanOut(thingsToNA) {

        //list of things that should be checked for NA values, so we can update the variables in the database
        for (i = 0, l = thingsToNA.length; i < l; i++) {
            var NA_variable = thingsToNA[i] + '_na';
            if ($scope.myapplication[thingsToNA[i]] === "") {
                delete $scope.myapplication[thingsToNA[i]];
                $scope.myapplication[NA_variable] = false;
            } else if ($scope.myapplication[thingsToNA[i]] === "NA") {
                $scope.myapplication[NA_variable] = true;
            } else {
                $scope.myapplication[NA_variable] = false;
            }
        }
    }

    // callback for ng-submit 'save': save application updates to server
    $scope.save = function () {

        cleanOut($scope.thingsToNA);

        if ($scope.myapplication.citizen !== undefined && $scope.myapplication.citizen === 'true') {
            $scope.myapplication.permanent_resident = 'false';
            $scope.myapplication.permanent_resident_card = 'false';
        }
        
        if ($stateParams.appType === 'freshman') {
            DataService.updateItem('application', $scope.myapplication.id, $scope.myapplication);
        } else {
            DataService.updateItem('transferApplication', $scope.myapplication.id, $scope.myapplication);
        }
    };
});