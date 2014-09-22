/*global angular*/
'use strict';

/**
 * @ngdoc function
 * @name terry.service:MyActivityService
 * @description
 * # MyActivityService
 * Service for the terry
 */
angular.module('TerryServices').factory('MyActivityService', function (Restangular, $q) {
    
    return {
        getAllActivity:
            function () {
                return Restangular.all("activity").getList();
            },
        getMyActivity:
            function (activity_id) {
                return Restangular.all("activity").get(activity_id);
            },
        addActivity:
            function (activity) {
                return Restangular.all("activity").post(activity);
            },
        updateActivity:
            function (activity_id, activity) {
                return Restangular.all("activity").all(activity_id).post(activity);
            },
        deleteActivity:
            function (activity_id) {
                return Restangular.all("activity").all(activity_id).remove();
            }
    };
});


