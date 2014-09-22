/*global angular*/
'use strict';

/**
 * @ngdoc function
 * @name terry.service:MyScholarshipService
 * @description
 * # MyScholarshipService
 * Service for the terry
 */
angular.module('TerryServices').factory('MyScholarshipService', function (Restangular, $q) {
    
    return {
        getAllScholarship:
            function () {
                return Restangular.all("scholarship").getList();
            },
        getMyScholarship:
            function (scholarship_id) {
                return Restangular.all("scholarship").get(scholarship_id);
            },
        addScholarship:
            function (scholarship) {
                return Restangular.all("scholarship").post(scholarship);
            },
        updateScholarship:
            function (scholarship_id, scholarship) {
                return Restangular.all("scholarship").all(scholarship_id).post(scholarship);
            },
        deleteScholarship:
            function (scholarship_id) {
                return Restangular.all("scholarship").all(scholarship_id).remove();
            }
    };
});


