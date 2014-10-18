/*global angular*/

/**
 * @ngdoc function
 * @name terry.controller:RegisterController
 * @description
 * # RegisterController
 * Controller for the terry
 */
angular.module('TerryControllers')
.controller('RegisterController', function($scope, $state, Auth, ngNotify) {
    'use strict';
        $scope.register = {};
    
        $scope.registerUser = function() {
            Auth.setCredentials("Visitor", "test");
            $scope.salt = "nfp89gpe";
            $scope.register.password = new String(CryptoJS.SHA512($scope.register.password +            $scope.register.username + $scope.salt));
            $scope.$parent.Restangular().all("users").post($scope.register).then(
                function(success) {
                    Auth.clearCredentials();
                    ngNotify.set("User account created. Please login!", {position: 'top', type:     'success'});
                $state.go("tabs.myapplications", {}, {reload: true});
            },function(fail) {
                Auth.clearCredentials();
                ngNotify.set(fail.data.message, {position: 'top', type: 'error'});
        });

        Auth.clearCredentials();
    };
});