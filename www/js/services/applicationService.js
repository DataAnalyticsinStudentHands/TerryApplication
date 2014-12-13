/*global angular*/

/**
 * @ngdoc function
 * @name terry.services:ApplicationService
 * @description
 * # ApplicationService
 * Sevice of the terry
 */
angular.module('Services').factory('ApplicationService', function (Restangular, ngNotify, DataService) {
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
        getApplication: function (type, application_id) {
            return Restangular.one(type).get(application_id).then(
                function (result) {
                    result = Restangular.stripRestangular(result);
                    
                    var application = result[0];
                    //check for NA
                    if (application.highschool_graduation_date_na === 'true')
                        application.highschool_graduation_date = "NA";
                    
                    return application;
                },
                function (application) {
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
            return Restangular.all("applications").customPUT(application, application_id);
        },
        getListofDocuments: function (application_id) {
            return Restangular.all("applications").customGET("upload", {
                applicationId: application_id
            }).then(
                function (result) {
                    result = Restangular.stripRestangular(result);
                    return result;
                },
                function (error) {
                    ngNotify.set("Something went wrong retrieving uploaded file information.", {
                        position: 'bottom',
                        type: 'error'
                    });
                }
            );
        }
    };
});