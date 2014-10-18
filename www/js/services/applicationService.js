/*global angular*/

/**
 * @ngdoc function
 * @name terry.services:ApplicationService
 * @description
 * # ApplicationService
 * Sevice of the terry
 */
angular.module('TerryServices').factory('ApplicationService', function (Restangular, ngNotify) {
    'use strict';

    return {
        getAllApplications: function () {
            return Restangular.all("applications").getList().then(
                function (result) {
                    result = Restangular.stripRestangular(result);
                    return result;
                },
                function (error) {
                    ngNotify.set("Something went wrong retrieving your application.", {
                        position: 'bottom',
                        type: 'error'
                    });
                }
            );
        },
        getApplication: function (application_id) {
            return Restangular.all("applications").get(application_id).then(
                function (result) {
                    result = Restangular.stripRestangular(result);
                    return result;
                },
                function (error) {
                    ngNotify.set("Something went wrong retrieving data for application", {
                        position: 'bottom',
                        type: 'error'
                    });
                }
            );
        },
        deleteApplication: function (application_id) {
            return Restangular.all("applications").all(application_id).remove();
        },
        createApplication: function (application) {
            return Restangular.all("applications").post(application);
        },
        updateApplication: function (application_id, application) {
            return Restangular.all("applications").all(application_id).post(application);
        },
        getListofDocuments: function (application_id) {
            return Restangular.all("applications/upload").get(application_id);
        },
    };
});