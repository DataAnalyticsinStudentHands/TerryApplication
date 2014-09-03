'use strict';

/**
 * @ngdoc function
 * @name terry.controller:MainController
 * @description
 * # MainController
 * Controller of the terry
 */
angular.module('TerryControllers')
    .controller('DashCtrl', function($scope) {
		})

		.controller(
				'ModalCtrl',
				function($scope, Restangular) {

					$scope.User = {};

					// callback for ng-click 'deleteUser':
					$scope.createUser = function() {

						if ($scope.User.username && $scope.User.password) {
							console.log('Create User', $scope.User);

							$scope.createNewUserResultPromise = Restangular
									.all("users").post($scope.User).then(
											function(users) {

												$scope.modal.hide();

											}, function(resultFail) {
												// console.log(resultFail);
											});

						}

						else {
							$scope.creationMessage = "Remember to fill in everything!";
						}

					}
				})

		
		

		.controller('secureCtrl', function($scope, Auth, $state) {
			// nothing to see here, move along
			$scope.logOut = function() {
				console.log('loggedout');
				Auth.clearCredentials();
				$state.go('tab.dash', {}, {
					reload : true
				});
			}
		});

		
