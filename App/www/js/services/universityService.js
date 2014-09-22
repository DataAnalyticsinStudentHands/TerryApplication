/*global angular*/
'use strict';

/**
 * @ngdoc function
 * @name terry.service:MyUniversityService
 * @description
 * # MyUniversityService
 * Service for the terry
 */
angular.module('TerryServices').factory('MyUniversityService', function (Restangular, $q) {
    
    return {
        getAllUniversity:
            function () {
                return Restangular.all("university").getList();
            },
        getMyUniversity:
            function (university_id) {
                return Restangular.all("university").get(university_id);
            },
        addUniversity:
            function (university) {
                return Restangular.all("university").post(university);
            },
        updateUniversity:
            function (university_id, university) {
                return Restangular.all("university").all(university_id).post(university);
            },
        deleteUniversity:
            function (university_id) {
                return Restangular.all("university").all(university_id).remove();
            }
    };
});


