/*global angular*/


/* Filters */
angular.module('Filters', []).filter('currentdate', function ($filter) {
    
    'use strict';
    
    return function() {
        return $filter('date')(new Date(), 'MM/dd/yyyy');
    };
});