'use strict';

/**
 * @ngdoc function
 * @name terry.controller:RegisterController
 * @description
 * # RegisterController
 * Controller for the terry
 */
angular.module('TerryControllers')
.controller('MyapplicationsController', function($scope, $location, $ionicModal, ngNotify, MyapplicationsService) {  

    $scope.myapplications = {};
    
    MyapplicationsService.getMyApplications()
    .then(function (response) {
        $scope.myapplications = response.data.myapplications;
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
        $scope.Restangular().all('users').getList().then(
            function(result) {									
                $scope.users = result;									
            }, function(resultFail) {
                // console.log(resultFail);
            });
    });
})

.controller('ModalCtrl',
    function($scope, Restangular, ngNotify) {

        $scope.currentApplication = {};

        // callback for ng-click 'createApplication':
        $scope.createApplication = function() {
            if ($scope.currentApplication.uhid && $scope.currentApplication.First && $scope.currentApplication.Last) {
                $scope.createNewUserResultPromise = Restangular
                .all("simple").post($scope.currentApplication).then(
                    function(users) {
                        $scope.modal.hide();
                    }, function(resultFail) {
                        // console.log(resultFail);
                    });
            }
            else {
                ngNotify.set("Remember to fill in everything!", {position: 'bottom', type: 'error'});
            }
        }
    });

