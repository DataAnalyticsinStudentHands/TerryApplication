/*global angular, cordova, console*/

// Honors Application Web App
angular.module('HonorsApplications', [
    'ionic',
    'restangular',
    'ngNotify',
    'databaseControllerModule',
    'databaseServicesModule',
    'Controllers',
    'Filters',
    'Services',
    'Directives',
    'ui.bootstrap.datetimepicker',
    'ui.utils',
    'ng-currency',
    'angularFileUpload'
]).run(function ($ionicPlatform, Restangular, $rootScope, Auth, $q, $state) {
    'use strict';

    // Set Base URL to connect to DASH RESTFUL webservices
    Restangular.setBaseUrl("http://127.0.0.1:8080/terrytest/"); // localhost
    //Restangular.setBaseUrl("http://www.housuggest.org:8080/terrytest/");
    //Restangular.setDefaultHttpFields({cache: true});

    // have Restangular available whereever we need it
    $rootScope.Restangular = function () {
        return Restangular;
    };

    $rootScope.isAuthenticated = function() {
        return Auth.hasCredentials();
    }

    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        //console.log("$stateChangeStart");
        //console.log($rootScope.isAuthenticated());
        if (toState.authenticate && !$rootScope.isAuthenticated()){
            console.log("non-authed");
            // User isn’t authenticated
            $state.go("signin");
            //What?
            event.preventDefault();
        };
    });

    //Logout user by clearing credentials
    $rootScope.logout = function () {
        Auth.clearCredentials();
        console.log("log out");
        $state.go('signin', {}, {
            reload: true
        });
    };

    // Some watchdogs for fixing ui-route issues Credits: Adam's answer in http://stackoverflow.com/a/20786262/69362
    $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams) {
        console.log('$stateChangeError - fired when an error occurs during transition.');
        console.log(arguments);
    });

    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
        console.log('$stateChangeSuccess to ' + toState.name + '- fired once the state transition is complete.');
    });

    $rootScope.$on('$viewContentLoaded', function (event) {
        console.log('$viewContentLoaded - fired after dom rendered', event);
    });

    $rootScope.$on('$stateNotFound', function (event, unfoundState, fromState, fromParams) {
        console.log('$stateNotFound ' + unfoundState.to + '  - fired when a state cannot be found by its name.');
        console.log(unfoundState, fromState, fromParams);
    });
})

.config(function ($stateProvider, $urlRouterProvider) {
    // Set up the various states which the app can be in.
    $stateProvider
        //signin, this is also the fallback
        .state('signin', {
            url: '/signin',
            views: {
                'login': {
                    templateUrl: 'templates/signin.html',
                    controller: 'loginCtrl'
                }
            },
            authenticate: false
        })

        //register
        .state('register', {
            url: "/register",
            templateUrl: "templates/register.html",
            controller: 'registerCtrl',
            authenticate: false
        })

        // setup an abstract state for the tabs directive
        .state('tabs', {
            url: '/tab',
            abstract: true,
            views: {
                'login': {
                    templateUrl: 'templates/tabs.html'
                }
            },
            authenticate: true
        })

        //home page
        .state('tabs.applications', {
            url: '/applications',
            resolve: {
                applications: function (DataService) {
                    return DataService.getAllItems('applications');
                },
                transfer_applications: function (DataService) {
                    return DataService.getAllItems('transferApplications');
                }
            },
            views: {
                'tab-applications': {
                    templateUrl: 'templates/tab-applications.html',
                    controller: 'MainController'
                }
            },
            authenticate: true
        })

        //
        .state('tabs.application', {
            url: '/application/:applicationId',
            abstract: true,
            authenticate: true,
            views: {
                "menuBar@home": { templateUrl: "templates/menus/menuBar/menu_app.html", controller:"menuCtrl"},
                "app": { templateUrl: "templates/home.html"},
                "bottomMenu":  { templateUrl: "partials/bottomMenu.html", controller:"menuCtrl"}
            }
        })

        .state('tabs.application.student_information', {
            url: '/student_information',
            views: {
                "tab-applications@tabs": {
                    templateUrl: 'templates/student_information.html',
                    controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })

        .state('tabs.application.highschool_information', {
            url: '/highschool_information',
            views: {
                "tab-applications@tabs": {
                    templateUrl: 'templates/highschool_information.html',
                    controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })

        .state('tabs.application.highschool_coursework', {
            url: '/highschool_coursework',
            views: {
                "tab-applications@tabs": {
                    templateUrl: 'templates/highschool_coursework.html',
                    controller: 'MyCourseworkController'
                }
            },
            authenticate: true
        })

        .state('tabs.application.employment', {
            url: '/employment',
            views: {
                "tab-applications@tabs": {
                    templateUrl: 'templates/employment.html',
                    controller: 'MyEmploymentController'
                }
            },
            authenticate: true
        })

        .state('tabs.application.college_plans', {
            url: '/college_plans',
            views: {
                "tab-applications@tabs": {
                    templateUrl: 'templates/college_plans.html',
                    controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })

        .state('tabs.application.financial_information', {
            url: '/financial_information',
            views: {
                "tab-applications@tabs": {
                    templateUrl: 'templates/financial_information.html',
                    controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })

        .state('tabs.application.scholarship_information', {
            url: '/scholarship_information',
            views: {
                "tab-applications@tabs": {
                    templateUrl: 'templates/scholarship_information.html',
                    controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })

        .state('tabs.application.essays', {
            url: '/essays',
            views: {
                "tab-applications@tabs": {
                    templateUrl: 'templates/essays.html',
                    controller: 'UploadController'
                }
            },
            authenticate: true
        })

        .state('tabs.application.submit', {
            url: '/submit',
            views: {
                "tab-applications@tabs": {
                    templateUrl: 'templates/submit.html',
                    controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })

        .state('tabs.application.confirmation', {
            url: '/confirmation',
            views: {
                "tab-applications@tabs": {
                    templateUrl: 'templates/confirmation.html',
                    controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })

    .state('tabs.transferapplication', {
        url: '/transferapplication/:applicationId',
        abstract: true,
        authenticate: true
    })

    .state('tabs.information', {
        url: '/information',
        views: {
            'tab-information': {
                templateUrl: 'templates/tab-information.html'
            }
        },
        authenticate: true
    })

    .state('tabs.user', {
        url: '/user',
        views: {
            'tab-user': {
                templateUrl: 'templates/tab-user_detail.html',
                controller: 'UserDetailController'
            }
        },
        authenticate: true
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/signin');
});