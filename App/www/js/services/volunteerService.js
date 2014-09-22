/*global angular*/
'use strict';

/**
 * @ngdoc function
 * @name terry.service:MyVolunteerService
 * @description
 * # MyVolunteerService
 * Service for the terry
 */
angular.module('TerryServices').factory('MyVolunteerService', function (Restangular, $q) {
    
    return {
        getAllVolunteer:
            function () {
                return Restangular.all("volunteer").getList();
            },
        getMyVolunteer:
            function (volunteer_id) {
                return Restangular.all("volunteer").get(volunteer_id);
            },
        addVolunteer:
            function (volunteer) {
                return Restangular.all("volunteer").post(volunteer);
            },
        updateVolunteer:
            function (volunteer_id, volunteer) {
                return Restangular.all("volunteer").all(volunteer_id).post(volunteer);
            },
        deleteVolunteer:
            function (volunteer_id) {
                return Restangular.all("volunteer").all(volunteer_id).remove();
            }
    };
});


