/*global angular*/
'use strict';

/**
 * @ngdoc function
 * @name terry.service:MyChildService
 * @description
 * # MyChildService
 * Service for the terry
 */
angular.module('TerryServices').factory('MyChildService', function (Restangular, $q) {
    
    return {
        getAllChild:
            function () {
                return Restangular.all("child").getList();
            },
        getMyChild:
            function (child_id) {
                return Restangular.all("child").get(child_id);
            },
        addChild:
            function (child) {
                return Restangular.all("child").post(child);
            },
        updateChild:
            function (child_id, child) {
                return Restangular.all("child").all(child_id).post(child);
            },
        deleteChild:
            function (child_id) {
                return Restangular.all("child").all(child_id).remove();
            }
    };
});


