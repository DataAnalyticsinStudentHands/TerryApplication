'use strict';

/**
 * @ngdoc function
 * @name terry.controller:TerryController
 * @description
 * # TerryController
 * Controller for the terry
 */
angular.module('TerryControllers')
.controller(
				'TerryapplicationController',
				function($scope, $stateParams) {

					$scope.Restangular().all("users").get($stateParams.userId)
							.then(function(result) {
								console.log(result);
								$scope.user = result;
							}, function(resultFail) {
								// console.log(resultFail);
							});
				})