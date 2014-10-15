/*global angular, console*/

/**
 * @ngdoc function
 * @name myapplication.controller:MyCourseworkController
 * @description
 * # MyCourseworkController
 * Controller for the terry
 */
angular.module('TerryControllers').controller('MyCourseworkController', function ($scope, $http, ngNotify, $stateParams, $state, $filter, $ionicSideMenuDelegate, $ionicModal, $ionicPopup, DataService) {
    'use strict';
    
    //Load some variables
    $http.get('json/course_types.json').success(function (data) {
        $scope.course_types = data;
    });
    $http.get('json/grades.json').success(function (data) {
        $scope.grades = data;
    });

    $scope.myVariables = {
        current_mode: 'Add'
    };

    $scope.mycourses = {};
    $scope.mycourse = {};

    // GET
    DataService.getAllItems('coursework').then(
        function (result) {
            $scope.mycourses = result;
        }
    );

    // callback for ng-click 'deleteCourse':
    $scope.deleteCourse = function (course_Id) {
        $ionicPopup.confirm({
            title: 'Confirm Delete',
            template: 'Are you sure you want to delete your course from the list?'
        }).then(function (res) {
            if (res) {
                DataService.deleteItem('coursework', course_Id).then(
                    function (success) {
                        $scope.updateLists();
                    }
                );
            } else {
                console.log('User are not sure to delete');
            }
        });
    };

    // callback for ng-click 'editCourse':
    $scope.editCourse = function (course) {
        $scope.myVariables.current_mode = "Edit";
        $scope.mycourse = course;
        var test = $filter('filter')($scope.course_types, {
            abbreviation: $scope.mycourse.type
        }, true);
        $scope.myVariables.myCourseType = test[0];
        test = $filter('filter')($scope.grades, {
            grade: $scope.mycourse.final_grade
        }, true);
        $scope.myVariables.myGrade = test[0];
        $scope.modal.show();
    };

    // callback for ng-click 'saveModal':
    $scope.saveModal = function () {
        $scope.mycourse.application_id = $stateParams.applicationId;
        $scope.mycourse.type = $scope.myVariables.myCourseType.abbreviation;
        $scope.mycourse.final_grade = $scope.myVariables.myGrade.grade;

        if ($scope.mycourse.name && $scope.mycourse.credit_hours && $scope.mycourse.final_grade) {

            if ($scope.myVariables.current_mode === 'Add') {
                $scope.mycourse.level = $scope.currentLevel;
                DataService.addItem('coursework', $scope.mycourse).then(
                    function (result) {
                        $scope.updateLists();
                        ngNotify.set("Succesfully added your coursework.", {
                            position: 'bottom',
                            type: 'success'
                        });
                        $scope.modal.hide();
                    },
                    function (error) {
                        ngNotify.set("Could not contact server to add coursework!", {
                            position: 'bottom',
                            type: 'error'
                        });
                    }
                );
            } else {
                DataService.updateItem('coursework', $scope.mycourse.id, $scope.mycourse).then(
                    function (result) {
                        $scope.updateLists();
                        ngNotify.set("Succesfully updated your coursework.", {
                            position: 'bottom',
                            type: 'success'
                        });
                        $scope.modal.hide();
                    },
                    function (error) {
                        ngNotify.set("Could not contact server to update coursework!", {
                            position: 'bottom',
                            type: 'error'
                        });
                    }
                );
            }
        } else {
            ngNotify.set("Remember to fill in everything!", {
                position: 'bottom',
                type: 'error'
            });
        }
    };

    // callback for ng-click 'modal'- open Modal dialog to add a new course
    $ionicModal.fromTemplateUrl('templates/modal_coursework.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Open the modal
    $scope.showAddCourse = function (level) {
        // Set some variables to default values
        $scope.myVariables.current_mode = "Add";
        $scope.myVariables.myCourseType = $scope.course_types[0];
        $scope.myVariables.myGrade = $scope.grades[0];
        $scope.mycourse = {};
        $scope.modal.show();
        $scope.currentLevel = level;
    };

    // Update lists
    $scope.updateLists = function () {
        DataService.getAllItems('coursework').then(
            function (result) {
                $scope.mycourses = result;
            }
        );
    };

    // Toggle open/close side menu
    $scope.toggleRight = function () {
        $ionicSideMenuDelegate.toggleRight();
    };
});