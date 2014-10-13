/*global angular*/


/* Filters */
angular.module('TerryFilters', []).filter('date', function ($filter) {
    
    'use strict';
    
return function (input) {
    if (input === null) {
        return "";
    }

    var _date = $filter('date')(new Date(input), 'MMM dd yyyy');

    return _date.toUpperCase();

};
});