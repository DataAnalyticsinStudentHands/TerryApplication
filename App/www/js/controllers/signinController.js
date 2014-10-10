'use strict';

/**
 * @ngdoc function
 * @name terry.controller:LoginController
 * @description
 * # LoginController
 * Controller for the terry
 */
angular.module('TerryControllers')
.controller('SignInController', function($scope, $state, ngNotify, $timeout, Auth) {
    
     $scope.signin = {};
     if($scope.isAuthenticated() === true) {
         //IF SUCCESSFULLY AUTH-ED USER IS TRYING TO GO TO LOGIN PAGE => SEND TO HOME PAGE OF APP
         $state.go('tabs.myapplications');
     }
     $scope.salt = "nfp89gpe"; //PENDING - NEED TO GET ACTUAL SALT
     $scope.submit = function() {
         if ($scope.signin.userName && $scope.signin.passWord) {
             document.activeElement.blur();
             $timeout(function() {
                 $scope.signin.passWordHashed = new String(CryptoJS.SHA512($scope.signin.passWord + $scope.signin.userName + $scope.salt));
                 Auth.setCredentials($scope.signin.userName, $scope.signin.passWordHashed);
                 $scope.signin.userName = '';
                 $scope.signin.passWord = '';
                 $scope.loginResultPromise = $scope.Restangular().all("users").getList();
                 $scope.loginResultPromise.then(function(result) {
                    $scope.loginResult = result;
                    $scope.loginMsg = "You have logged in successfully!";
                    Auth.confirmCredentials();
                     ngNotify.set($scope.loginMsg, 'success');
                    $state.go("tabs.myapplications", {}, {reload: true});
                    
                 }, function(error) {
                    if (error.status === 0) {
                        ngNotify.set("Internet or server unavailable.", {type : "error", sticky : true});
                    } else {
                        ngNotify.set("Incorrect username or password.", {position: 'bottom', type: 'error'});
                    }
                    Auth.clearCredentials();
                 });
             }, 500);
         } else {
             $scope.loginMsg = "Please enter a username and password.";
             ngNotify.set($scope.loginMsg, {position: 'bottom', type: 'error'});
         }
     };
    
    
 })

.controller('LogOutController', function($scope, AuthenticationService) {
    AuthenticationService.logout();
});