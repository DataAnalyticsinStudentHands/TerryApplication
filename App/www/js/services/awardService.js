/*global angular*/

/**
 * @ngdoc function
 * @name terry.service:MyAwardService
 * @description
 * # MyAwardService
 * Service for the terry
 */
angular.module('TerryServices').factory('MyAwardService', function (Restangular, $q) {
    'use strict';
    
    return {
        getAllAward:
            function () {
                return Restangular.all("award").getList();
            },
        getMyAward:
            function (award_id) {
                return Restangular.all("award").get(award_id);
            },
        addAward:
            function (award) {
                return Restangular.all("award").post(award).then(
                function (result) {
                    ngNotify.set("Succesfully saved your award to the server.", {
                        position: 'bottom',
                        type: 'success'
                    });
                },
                function (error) {
                    ngNotify.set("Could not contact server to add award!", {
                        position: 'bottom',
                        type: 'error'
                    });
                }
            );
            },
        updateAward:
            function (award_id, award) {
                return Restangular.all("award").all(award_id).post(award).then(
                function (result) {
                    ngNotify.set("Succesfully updated your award on the server.", {
                        position: 'bottom',
                        type: 'success'
                    });
                },
                function (error) {
                    ngNotify.set("Could not contact award to update service!", {
                        position: 'bottom',
                        type: 'error'
                    });
                }
            );
            },
        deleteAward:
            function (award_id) {
                return Restangular.all("award").all(award_id).remove().then(
                function (result) {
                    ngNotify.set("Succesfully deleted your award.", {position: 'bottom', type: 'success'});
                },
                function (error) {
                    ngNotify.set("Could not contact server to delete award!", {position: 'bottom', type: 'error'});
                }
            );
            }
    };
});


