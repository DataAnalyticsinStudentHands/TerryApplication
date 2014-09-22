/*global angular*/
'use strict';

/**
 * @ngdoc function
 * @name terry.service:MyAwardService
 * @description
 * # MyAwardService
 * Service for the terry
 */
angular.module('TerryServices').factory('MyAwardService', function (Restangular, $q) {
    
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
                return Restangular.all("award").post(award);
            },
        updateAward:
            function (award_id, award) {
                return Restangular.all("award").all(award_id).post(award);
            },
        deleteAward:
            function (award_id) {
                return Restangular.all("award").all(award_id).remove();
            }
    };
});


