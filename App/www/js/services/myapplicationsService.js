/*global angular*/
'use strict';

/**
 * @ngdoc function
 * @name terry.services:MyapplicationsService
 * @description
 * # MyapplicationsService
 * Sevice of the terry
 */
angular.module('TerryServices').factory('MyApplicationsService', function (Restangular) {
    //  return Restangular.all('applications');



    return {
        getAllApplications:
            function () {
                return Restangular.all("applications").getList();
            },
        getApplication:
            function (application_id) {
                return Restangular.all("applications").get(application_id);
            },
        createApplication:
            function (application) {
                return Restangular.all("applications").post(application);
            },
        deleteApplication:
            function (pid) {
                return Restangular.all("applications").all(pid).remove();
            }
    };
});




