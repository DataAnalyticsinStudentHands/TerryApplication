/*global angular*/
'use strict';

/**
 * @ngdoc function
 * @name terry.service:MyEmploymentService
 * @description
 * # MyEmploymentService
 * Service for the terry
 */
angular.module('TerryServices').factory('MyEmploymentService', function (Restangular, $q) {
    
    return {
        getAllEmployment:
            function () {
                return Restangular.all("employment").getList();
            },
        getMyEmployment:
            function (employment_id) {
                return Restangular.all("employment").get(employment_id);
            },
        addEmployment:
            function (employment) {
                return Restangular.all("employment").post(employment);
            },
        updateEmployment:
            function (employment_id, employment) {
                return Restangular.all("employment").all(employment_id).post(employment);
            },
        deleteEmployment:
            function (employment_id) {
                return Restangular.all("employment").all(employment_id).remove();
            }
    };
});


