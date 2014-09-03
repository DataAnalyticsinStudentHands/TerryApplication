'use strict';

/**
 * @ngdoc function
 * @name terry.controller:RegisterController
 * @description
 * # RegisterController
 * Controller for the terry
 */
angular.module('TerryControllers')
.controller('MyapplicationsController', function($scope, $location, $ionicModal, MyapplicationsService) {                    
                    $scope.myapplications = MyapplicationsService.all();					
				})
