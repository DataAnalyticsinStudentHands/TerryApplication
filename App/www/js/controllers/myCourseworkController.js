/*global angular, console*/
'use strict';

/**
 * @ngdoc function
 * @name myapplication.controller:MyCourseworkController
 * @description
 * # MyCourseworkController
 * Controller for the terry
 */
angular.module('TerryControllers').controller('MyCourseworkController', function ($scope, ngNotify, $stateParams, $state, $filter, $ionicSideMenuDelegate, $ionicModal, MyCourseworkService) {
    
    $scope.myVariables = {
        current_mode: 'Add',
    };
    
    $scope.mycourses = {};
    $scope.mycourse = {};
    var currentLevel = "sophomore";

    // GET
    MyCourseworkService.getAllCoursework().then(
        function (result) {
            $scope.mycourses = result;
        },
        function (error) {
            console.error(error);
            ngNotify.set("Something went wrong retrieving data.", {type : "error", sticky : true});
        }
    );
    
    // callback for ng-click 'deleteCourse':
    $scope.deleteCourse = function (courseId) {
        MyCourseworkService.deleteCoursework(courseId);
    };
    
    // callback for ng-click 'editCourse':
    $scope.editCourse = function (course) {
        $scope.myVariables.current_mode = "Edit";
        $scope.mycourse = course;
        var test = $filter('filter')($scope.course_types, {abbreviation: $scope.mycourse.type}, true);
        $scope.myVariables.myCourseType = test[0];
                
        $scope.modal.show();
        var test = $filter('filter')($scope.levels, {id: level}, true);
        currentLevel = test[0].name;
    };

    // callback for ng-click 'saveModal':
    $scope.saveModal = function () {
        $scope.mycourse.application_id = $stateParams.applicationId;
        $scope.mycourse.level = currentLevel;
        $scope.mycourse.type = $scope.myVariables.myCourseType.abbreviation;        
        
        if ($scope.mycourse.name && $scope.mycourse.credit_hours && $scope.mycourse.final_grade) {
            
            if ($scope.myVariables.current_mode === 'Add') {
                MyCourseworkService.addCoursework($scope.mycourse).then(
                    function (result) {
                        $scope.modal.hide();
                        ngNotify.set("Succesfully added your coursework.", {position: 'bottom', type: 'success'});
                    },
                    function (error) {
                        ngNotify.set("Could not contact server to add coursework!", {position: 'bottom', type: 'error'});
                    }
                );
            } else {
                MyCourseworkService.updateCoursework($scope.mycourse.id, $scope.mycourse).then(
                    function (result) {
                        $scope.modal.hide();
                        ngNotify.set("Succesfully updated your coursework.", {position: 'bottom', type: 'success'});
                    },
                    function (error) {
                        ngNotify.set("Could not contact server to update coursework!", {position: 'bottom', type: 'error'});
                    }
                );
            }
        } else {
            ngNotify.set("Remember to fill in everything!", {position: 'bottom', type: 'error'});
        }
    };

    // callback for ng-click 'modal'- open Modal dialog to add a new course
    $ionicModal.fromTemplateUrl('modal_Coursework.html', {
        scope : $scope,
        animation : 'slide-in-up'
    }).then(function (modal) {
        $scope.myCourseType = $scope.course_types[0];
        $scope.modal = modal;
    });
    
    // Open the modal
    $scope.showAddCourse = function (level) {
        // Set some variables to default values
        $scope.myVariables.current_mode = "Add";        
        $scope.myVariables.myCourseType = $scope.course_types[0];
        $scope.mycourse = {};
        $scope.modal.show();
        var test = $filter('filter')($scope.levels, {id: level}, true);       
        currentLevel = test[0].name;
    };

    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
        MyCourseworkService.getAllCoursework().then(
            function (result) {
                $scope.mycourses = result;
            },
            function (error) {
                console.error(error);
            }
        );
    });
    
    // Toggle open/close side menu
    $scope.toggleRight = function () {
        $ionicSideMenuDelegate.toggleRight();
    };
    
    $scope.course_types = [
        {
            "name": "Advanced Placement",
            "abbreviation": "AP"
        },
        {
            "name": "International Baccalaureate Program",
            "abbreviation": "IB"
        },
        {
            "name": "Dual Credit",
            "abbreviation": "DC"
        }
    ];
    
    $scope.levels = [
        {
            "id": 1,
            "name": "sophomore"
        },
        {
            "id": 2,
            "name": "junior"
        },
        {
            "id": 3,
            "name": "senior"
        }
    ];
});