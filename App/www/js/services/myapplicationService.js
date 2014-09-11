'use strict';

/**
 * @ngdoc function
 * @name terry.controller:UserService
 * @description
 * # UserService
 * Service for the terry
 */
angular.module('TerryServices')
.factory('MyApplicationService', function(Restangular, $q) {
    
    return {
        getMyApplication:
            function(application_id) {
                return Restangular.all("applications").get(application_id);
            },
        addMyApplication:
            function(application) {                
                return Restangular.all("applications").post(application);
            },
        updateMyApplication:
            function(id, application) {
                 return Restangular.all("applications").all(id).post(application);
            },
        deleteMyApplication:
            function(pid) {
                return Restangular.all("applications").all(pid).remove();
            },
    }
});


