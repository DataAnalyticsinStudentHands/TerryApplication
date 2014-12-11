/*global angular, console*/

/**
 * @ngdoc function
 * @name terry.service:DataService
 * @description
 * # DataService
 * Service for the terry
 */
angular.module('Services').factory('DataService', function (Restangular, $http, $q, ngNotify) {
    'use strict';

    //Load data for form data for terry application
    var application_form,
        modal_award_form,
        modal_child_form,
        modal_coursework_form,
        modal_employment_form,
        modal_scholarship_form,
        modal_volunteer_form,
        states;

    $http.get('json/form_application.json').success(function (data) {
        application_form = data;
    });
    $http.get('json/form_modal_award.json').success(function (data) {
        modal_award_form = data;
    });
    $http.get('json/form_modal_child.json').success(function (data) {
        modal_child_form = data;
    });
    $http.get('json/form_modal_coursework.json').success(function (data) {
        modal_coursework_form = data;
    });
    $http.get('json/form_modal_employment.json').success(function (data) {
        modal_employment_form = data;
    });
    $http.get('json/form_modal_scholarship.json').success(function (data) {
        modal_scholarship_form = data;
    });
    $http.get('json/form_modal_volunteer.json').success(function (data) {
        modal_volunteer_form = data;
    });
    $http.get('json/states.json').success(function (data) {
        states = data;
    });

    return {

        getForm: function (acType) {
            switch (acType) {
                case 'application':
                    return application_form;
                case 'award':
                    return modal_award_form;
                case 'child':
                    return modal_child_form;
                case 'coursework':
                    return modal_coursework_form;
                case 'employment':
                    return modal_employment_form;
                case 'scholarship':
                    return modal_scholarship_form;
                case 'volunteer':
                    return modal_volunteer_form;
            }
        },
        getStates: function() {
            return states;
        },

        
        getAllItems: function (acType) {

            return Restangular.all(acType).getList().then(
                function (result) {
                    result = Restangular.stripRestangular(result);
                    result.type = acType;
                    return result;
                },
                function (error) {
                    ngNotify.set("Something went wrong retrieving data for " + acType, {
                        position: 'bottom',
                        type: 'error'
                    });
                }
            );

        },
        getItem: function (type, item_id) {
            return Restangular.one(type, item_id).get().then(
                function (result) {
                    result = Restangular.stripRestangular(result);
                    return result[0];
                },
                function (error) {
                    ngNotify.set("Something went wrong retrieving data for type " + type, {
                        position: 'bottom',
                        type: 'error'
                    });
                }
            );
        },
        addItem: function (type, item) {

            return Restangular.all(type).post(item).then(

                function (result) {
                    ngNotify.set("Succesfully saved your " + type + " to the server.", {
                        position: 'bottom',
                        type: 'success'
                    });
                },
                function (error) {
                    ngNotify.set("Could not contact server to add " + type + " !", {
                        position: 'bottom',
                        type: 'error'
                    });
                }
            );
        },
        updateItem: function (type, item_id, item) {
            
            localStorage.setItem(type, item);

            return Restangular.all(type).all(item_id).post(item).then(
                function (result) {
                    ngNotify.set("Succesfully updated your " + type + " on the server.", {
                        position: 'bottom',
                        type: 'success'
                    });
                },
                function (error) {
                    ngNotify.set("Could not contact server to update " + type + " !", {
                        position: 'bottom',
                        type: 'error'
                    });
                }
            );
        },
        storeItem: function (type, item) {
            
            localStorage.setItem(type, item);
            return true;

        },
        deleteItem: function (type, item_id) {

            return Restangular.all(type).all(item_id).remove().then(
                function (result) {
                    ngNotify.set("Succesfully deleted your " + type + " .", {
                        position: 'bottom',
                        type: 'success'
                    });
                },
                function (error) {
                    ngNotify.set("Could not contact server to delete " + type + " !", {
                        position: 'bottom',
                        type: 'error'
                    });
                }
            );
        }
    };
});