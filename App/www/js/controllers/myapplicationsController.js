'use strict';

/**
 * @ngdoc function
 * @name terry.controller:MyapplicationsController
 * @description
 * # MyapplicationsController
 * Controller for the terry
 */
angular.module('TerryControllers')
.controller('MyapplicationsController', function($scope, $location, $ionicModal, ngNotify, MyapplicationsService, $ionicNavBarDelegate, Restangular) {  

    $scope.myapplications = {};

    // GET /proposals
    MyapplicationsService.getList().then(
        function(myapplications) {
            $scope.myapplications = myapplications;
        }, function (error) {
            console.error(error);
        });

    // callback for ng-click 'modal'- open Modal dialog to create a new application
    $ionicModal.fromTemplateUrl('modal.html', {
        scope : $scope,
        animation : 'slide-in-up'
    }).then(function(modal) {
        $scope.modal = modal;
    });

    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
        MyapplicationsService.getList().then(
            function(myapplications) {
                $scope.myapplications = myapplications;
            }, function (error) {
                console.error(error);
            });
    });
    
    $scope.myapplication = {};

    // callback for ng-click 'createApplication':
    $scope.createApplication = function() {
        if ($scope.myapplication.uh_id && $scope.myapplication.first_name && $scope.myapplication.last_name) {

            $scope.createNewApplicationResultPromise = Restangular
            .all("applications").post($scope.myapplication).then(
                function(applications) {
                    $scope.modal.hide();
                }, function(resultFail) {
                    ngNotify.set("Could not contact server for application creation!", {position: 'bottom', type: 'error'});
                });
        }
        else {
            ngNotify.set("Remember to fill in everything!", {position: 'bottom', type: 'error'});
        }
    }

    // callback for ng-click 'deleteApplication':
    $scope.deleteApplication = function(applicationId) {
        $scope.Restangular()
        .all("applications")
        .all(applicationId)
        .remove()
        .then(
            function(myapplications) {
                $scope
                .Restangular()
                .all('applications')
                .getList()
                .then(
                    function(result) {

                        $scope.myapplications = result;

                    },
                    function(resultFail) {
                        // console.log(resultFail);
                    });
            });

    }
})

//Modal popup for creating applications
.controller('ModalCtrl',
            function($scope, Restangular, ngNotify) {

    
});

