/*global angular*/

/**
 * @ngdoc function
 * @name terry.service:MyScholarshipService
 * @description
 * # MyScholarshipService
 * Service for the terry
 */
angular.module('TerryServices').factory('MyScholarshipService', function (Restangular, $q, ngNotify) {
    'use strict';
    
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
                return Restangular.all("scholarship").post(scholarship).then(
                function (result) {
                    ngNotify.set("Succesfully saved your scholarship to the server.", {
                        position: 'bottom',
                        type: 'success'
                    });
                },
                function (error) {
                    ngNotify.set("Could not contact server to add scholarship!", {
                        position: 'bottom',
                        type: 'error'
                    });
                }
            );
            },
        updateScholarship:
            function (scholarship_id, scholarship) {
                return Restangular.all("scholarship").all(scholarship_id).post(scholarship).then(
                function (result) {
                    ngNotify.set("Succesfully updated your scholarship on the server.", {
                        position: 'bottom',
                        type: 'success'
                    });
                },
                function (error) {
                    ngNotify.set("Could not contact server to update scholarship!", {
                        position: 'bottom',
                        type: 'error'
                    });
                }
            );
            },
        deleteScholarship:
            function (scholarship_id) {
                return Restangular.all("scholarship").all(scholarship_id).remove().then(
                function (result) {
                    ngNotify.set("Succesfully deleted your scholarship.", {position: 'bottom', type: 'success'});
                },
                function (error) {
                    ngNotify.set("Could not contact server to delete scholarship!", {position: 'bottom', type: 'error'});
                }
            );
            }
    };
});


