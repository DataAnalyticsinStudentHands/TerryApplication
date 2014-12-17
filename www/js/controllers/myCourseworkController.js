/*global angular, console*/

/**
 * @ngdoc function
 * @name myapplication.controller:MyCourseworkController
 * @description
 * # MyCourseworkController
 * Controller for the terry
 */
angular.module('Controllers').controller('MyCourseworkController', function ($scope, $http, ngNotify, $stateParams, $state, $filter, $ionicSideMenuDelegate, $ionicModal, $ionicPopup, DataService) {
    'use strict';
    
    //Load some variables
    $http.get('json/course_types.json').success(function (data) {
        $scope.course_types = data;
    });
    $http.get('json/grades.json').success(function (data) {
        $scope.grades = data;
    });

    

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
});