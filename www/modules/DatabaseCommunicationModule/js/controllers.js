/*global angular, console, CryptoJS*/

/* Controllers */
var databaseController = angular.module('databaseControllerModule', []);

databaseController.controller('loginCtrl', ['$scope', 'Auth', '$state', 'ngNotify',
    function ($scope, Auth, $state, ngNotify) {
        'use strict';
        if ($scope.isAuthenticated() === true) {
            //Point 'em to logged in page of app
            $state.go('tabs.applications');
        }

        $scope.signin = {};
        //we need to put the salt on server + client side and it needs to be static
        $scope.salt = "nfp89gpe"; //PENDING

        $scope.submit = function () {
            if ($scope.signin.userName && $scope.signin.passWord) {
                $scope.passWordHashed = new String(CryptoJS.SHA512($scope.signin.passWord + $scope.signin.userName + $scope.salt));
                //console.log($scope.passWordHashed);
                Auth.setCredentials($scope.signin.userName, $scope.passWordHashed);
                $scope.loginResultPromise = $scope.Restangular().one("users").one("myUser").get();
                $scope.loginResultPromise.then(function (result) {
                    $scope.loginResult = result;
                    $scope.loginMsg = "You have logged in successfully!";
                    Auth.confirmCredentials();
                    ngNotify.set($scope.loginMsg, 'success');
                    $state.go('tabs.applications');
                }, function (error) {
                    if (error.status === 0) {
                        ngNotify.set("Internet or Server not available", {
                            position: 'bottom',
                            type: 'error'
                        });
                    } else {
                        $scope.loginMsg = "Wrong username or password!";
                        ngNotify.set($scope.loginMsg, {
                            position: 'bottom',
                            type: 'error'
                        });
                    }
                    Auth.clearCredentials();
                });
                $scope.signin.userName = '';
                $scope.signin.passWord = '';
            } else if (!$scope.signin.userName && !$scope.signin.passWord) {
                $scope.loginMsg = "Please enter a username and password.";
                ngNotify.set($scope.loginMsg, {
                    position: 'bottom',
                    type: 'error'
                });
                $scope.loginResult = "";
            } else if (!$scope.signin.userName) {
                $scope.loginMsg = "Please enter a username.";
                ngNotify.set($scope.loginMsg, {
                    position: 'bottom',
                    type: 'error'
                });
                $scope.loginResult = "";
            } else if (!$scope.signin.passWord) {
                $scope.loginMsg = "Please enter a password.";
                ngNotify.set($scope.loginMsg, {
                    position: 'bottom',
                    type: 'error'
                });
                $scope.loginResult = "";
            }
        };
    }]);

databaseController.controller('registerCtrl', ['$scope', '$state', 'Auth', 'ngNotify', '$ionicLoading',
    function ($scope, $state, Auth, ngNotify, $ionicLoading) {
        'use strict';

        $scope.register = {};
        $scope.password = {};

        $scope.registerUser = function () {

            if ($scope.password.password === $scope.password.confirm) {
                Auth.setCredentials("Visitor", "test");
                $scope.salt = "nfp89gpe";
                $scope.register.password = new String(CryptoJS.SHA512($scope.password.password + $scope.register.username + $scope.salt));
                $scope.register.email = $scope.register.username;
                $ionicLoading.show();
                $scope.$parent.Restangular().all("users").post($scope.register).then(
                    function (success) {
                        $ionicLoading.hide();
                        Auth.clearCredentials();
                        ngNotify.set("User account: " + $scope.register.username + " created. Please login!", {
                            position: 'top',
                            type: 'success'
                        });
                        $state.go("signin", {}, {
                            reload: true
                        });
                    },
                    function (fail) {
                        $ionicLoading.hide();
                        Auth.clearCredentials();
                        ngNotify.set(fail.data.message, {
                            position: 'top',
                            type: 'error'
                        });
                    }
                );

                Auth.clearCredentials();

            } else {
                $scope.password.password = "";
                $scope.password.confirm = "";
                ngNotify.set("Passwords must match!", {
                    position: 'top',
                    type: 'error'
                });
            }
        };
    }]);

databaseController.controller('secureCtrl', ['$scope', 'Auth', '$state',
    function ($scope, Auth, $state) {
        'use strict';
        //nothing to see here, move along
        $scope.logOut = function () {
            console.log('loggedout');
            Auth.clearCredentials();
            $state.go('secure', {}, {
                reload: true
            });
        };
    }]);