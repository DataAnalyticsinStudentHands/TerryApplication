'use strict';
/* Controllers */
var databaseController = angular.module('databaseControllerModule', []);

databaseController.controller('loginCtrl', ['$scope', 'Auth', '$state', 'ngNotify',
 function($scope, Auth, $state, ngNotify) {
     if($scope.isAuthenticated() === true) {
         //Point 'em to logged in page of app
         $state.go('tabs.applications');
     }

     $scope.signin = {};
     //we need to put the salt on server + client side and it needs to be static
     $scope.salt = "nfp89gpe"; //PENDING
     
     $scope.submit = function() {
         if ($scope.signin.userName && $scope.signin.passWord) {
             $scope.passWordHashed = new String(CryptoJS.SHA512($scope.signin.passWord + $scope.signin.userName + $scope.salt));
             //console.log($scope.passWordHashed);
             Auth.setCredentials($scope.signin.userName, $scope.passWordHashed);
             $scope.loginResultPromise = $scope.Restangular().one("users").one("myUser").get();
             $scope.loginResultPromise.then(function(result) {
                 $scope.loginResult = result;
                 $scope.loginMsg = "You have logged in successfully!";
                 Auth.confirmCredentials();
                 ngNotify.set($scope.loginMsg, 'success');
                 $state.go('tabs.applications');
             }, function(error) {
                $scope.loginMsg = "Wrong username or password!";
                 ngNotify.set($scope.loginMsg, {position: 'bottom', type: 'error'});
                Auth.clearCredentials();
             });
             $scope.signin.userName = '';
             $scope.signin.passWord = '';
         } else if(!$scope.signin.userName && !$scope.signin.passWord) {
             $scope.loginMsg = "Please enter a username and password.";
             ngNotify.set($scope.loginMsg, {position: 'bottom', type: 'error'});
             $scope.loginResult = "";
         } else if (!$scope.signin.userName) {
             $scope.loginMsg = "Please enter a username.";
             ngNotify.set($scope.loginMsg, {position: 'bottom', type: 'error'});
             $scope.loginResult = "";
         } else if (!$scope.signin.passWord) {
             $scope.loginMsg = "Please enter a password.";
             ngNotify.set($scope.loginMsg, {position: 'bottom', type: 'error'});
             $scope.loginResult = "";
         }
     };
 }]);

databaseController.controller('registerCtrl', ['$scope', '$state', 'Auth', 'ngNotify', function($scope, $state, Auth, ngNotify) {
    $scope.register = {};

    $scope.registerUser = function() {
        Auth.setCredentials("Visitor", "test");
        $scope.salt = "nfp89gpe";
        $scope.register.password = new String(CryptoJS.SHA512($scope.register.password + $scope.register.username + $scope.salt));
        $scope.register.email = $scope.register.username;
        $scope.$parent.Restangular().all("users").post($scope.register).then(
            function(success) {
                Auth.clearCredentials();
                ngNotify.set("User account created. Please login!", {position: 'top', type:     'success'});
                $state.go("signin", {}, {reload: true});
            },function(fail) {
                Auth.clearCredentials();
                ngNotify.set(fail.data.message, {position: 'top', type: 'error'});
        });

        Auth.clearCredentials();
    }
}]);

databaseController.controller('secureCtrl', ['$scope', 'Auth', '$state',
  function($scope, Auth, $state) {
      //nothing to see here, move along
      $scope.logOut = function() {
          console.log('loggedout');
          Auth.clearCredentials();
          $state.go('secure',{},{reload: true});
      }
  }]);