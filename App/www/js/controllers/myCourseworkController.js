/*global angular, console*/
'use strict';

/**
 * @ngdoc function
 * @name myapplication.controller:MyCourseworkController
 * @description
 * # MyCourseworkController
 * Controller for the terry
 */
angular.module('TerryControllers').controller('MyCourseworkController', function ($scope, ngNotify, $stateParams, $state, $filter, $ionicSideMenuDelegate,  $ionicPopup, $ionicModal, MyCourseworkService) {

    $scope.toggleRight = function () {
        $ionicSideMenuDelegate.toggleRight();
    };
    
    $scope.mycourses = {};
    $scope.mycourse = {};
    var currentLevel = "sophomore";

    // GET /coursework
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
        MyCourseworkService.deleteCourse(courseId);
    };

    // callback for ng-click 'addCourse':
    $scope.addCourse = function () {
        $scope.mycourse.application_id = $stateParams.applicationId;
        $scope.mycourse.level = currentLevel;
      //  $scope.mycourse.type = $scope.mycourse.type.abbreviation;
        $scope.mycourse.type = "AP";
        if ($scope.mycourse.name && $scope.mycourse.credit_hours && $scope.mycourse.final_grade) {
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
            ngNotify.set("Remember to fill in everything!", {position: 'bottom', type: 'error'});
        }
        MyCourseworkService.addCourse();
    };

    // callback for ng-click 'modal'- open Modal dialog to add a new course
    $ionicModal.fromTemplateUrl('modal_addCoursework.html', {
        scope : $scope,
        animation : 'slide-in-up'
    }).then(function (modal) {
        $scope.myCourseType = $scope.course_types[0];
        $scope.modal = modal; 
    });
    
    // Open the modal
    $scope.showAddCourse = function(level) {
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