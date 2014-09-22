/*global angular*/
'use strict';

/**
 * @ngdoc function
 * @name terry.service:MyCourseworkService
 * @description
 * # MyCourseworkService
 * Service for the terry
 */
angular.module('TerryServices').factory('MyCourseworkService', function (Restangular, $q) {
    
    return {
        getAllCoursework:
            function () {
                return Restangular.all("coursework").getList();
            },
        getMyCoursework:
            function (coursework_id) {
                return Restangular.all("coursework").get(coursework_id);
            },
        addCoursework:
            function (coursework) {
                return Restangular.all("coursework").post(coursework);
            },
        updateCoursework:
            function (coursework_id, coursework) {
                return Restangular.all("coursework").all(coursework_id).post(coursework);
            },
        deleteCoursework:
            function (coursework_id) {
                return Restangular.all("coursework").all(coursework_id).remove();
            }
    };
});


