/*global angular*/

/**
 * @ngdoc function
 * @name terry.service:MyVolunteerService
 * @description
 * # MyVolunteerService
 * Service for the terry
 */
angular.module('TerryServices').factory('MyVolunteerService', function (Restangular, $q, ngNotify) {
    'use strict';

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
                return Restangular.all("volunteer").post(volunteer).then(
                    function (result) {
                        ngNotify.set("Succesfully saved your service to the server.", {
                            position: 'bottom',
                            type: 'success'
                        });
                    },
                    function (error) {
                        ngNotify.set("Could not contact server to add service!", {
                            position: 'bottom',
                            type: 'error'
                        });
                    }
                );
            },
        updateVolunteer:
            function (volunteer_id, volunteer) {
                return Restangular.all("volunteer").all(volunteer_id).post(volunteer).then(
                    function (result) {
                        ngNotify.set("Succesfully updated your service on the server.", {
                            position: 'bottom',
                            type: 'success'
                        });
                    },
                    function (error) {
                        ngNotify.set("Could not contact server to update service!", {
                            position: 'bottom',
                            type: 'error'
                        });
                    }
                );
            },
        deleteVolunteer:
            function (volunteer_id) {
                return Restangular.all("volunteer").all(volunteer_id).remove().then(
                    function (result) {
                        ngNotify.set("Succesfully deleted your service.", {position: 'bottom', type: 'success'});
                    },
                    function (error) {
                        ngNotify.set("Could not contact server to delete service!", {position: 'bottom', type: 'error'});
                    }
                );
            }
    };
});


