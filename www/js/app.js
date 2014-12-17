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
]).run(function ($ionicPlatform, Restangular, $rootScope, $ionicSideMenuDelegate, Auth, $q, $state) {
    'use strict';

    // Set Base URL to connect to DASH RESTFUL webservices
    //Restangular.setBaseUrl("http://127.0.0.1:8080/terrytest/"); // localhost
    Restangular.setBaseUrl("http://www.housuggest.org:8080/terrytest/");
    //Restangular.setDefaultHttpFields({cache: true});

    // have Restangular available whereever we need it
    $rootScope.Restangular = function () {
        return Restangular;
    };

    $rootScope.isAuthenticated = function () {
        return Auth.hasCredentials();
    };

    $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
        console.log("$stateChangeStart to state: " + toState.name);
        //console.log($rootScope.isAuthenticated());
        if (toState.authenticate && !$rootScope.isAuthenticated()) {
            console.log("non-authed");
            // User isn’t authenticated
            $state.go("signin");
            //What?
            event.preventDefault();
        }
        
    });
    
    $rootScope.toggleRight = function () {
        $ionicSideMenuDelegate.toggleRight();
    };

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
    $stateProvider
        .state('signin', {
            url: '/signin',
            templateUrl: 'templates/signin.html',
            controller: 'loginCtrl',
            authenticate: false
        })
    
        .state('register', {
            url: '/register',
            templateUrl: "templates/register.html",
            controller: 'registerCtrl',
            authenticate: false
        })

        .state('tabs', {
            url: '/tab',
            abstract: true,
            templateUrl: 'templates/tabs.html',
            authenticate: true
        })
    
        .state('tabs.applications', {
            url: '/applications',
            resolve: {
                freshman_applications: function (DataService) {
                    return DataService.getAllItems('application');
                },
                transfer_applications: function (DataService) {
                    return DataService.getAllItems('transferApplication');
                }
            },
            views: {
                'applications-tab': {
                    templateUrl: 'templates/tab-applications.html',
                    controller: 'MainController'
                }
            },
            authenticate: true
        })
    
        .state('tabs.applications.application', {
            url: '/application/:applicationId?appType',
            abstract: true,
            views: {
                'applications-tab@tabs': {                    
                        templateUrl: 'templates/abstract_application.html',
                        controller: 'MyApplicationController' 
                }
            },
            resolve: {
                application: function (DataService, $stateParams) {
                    return DataService.getItem('application', $stateParams.applicationID);
                },
                activity: function (DataService) {
                    return DataService.getAllItems('activity');
                },
                coursework: function (DataService) {
                    return DataService.getAllItems('coursework');
                },
                institution: function (DataService) {
                    return DataService.getAllItems('institution');
                },
                university: function (DataService) {
                    return DataService.getAllItems('university');
                },
                scholarship: function (DataService) {
                    return DataService.getAllItems('scholarship');
                },
                child: function (DataService) {
                    return DataService.getAllItems('child');
                },
                employment: function (DataService) {
                    return DataService.getAllItems('employment');
                },
                military: function (DataService) {
                    return DataService.getAllItems('military');
                },
                transfer_activity: function (DataService) {
                    return DataService.getAllItems('transfer_activity');
                },
                volunteer: function (DataService) {
                    return DataService.getAllItems('volunteer');
                },
                award: function (DataService) {
                    return DataService.getAllItems('award');
                }
            },
            authenticate: true           
        })
    
        .state('tabs.applications.application.student_information', {
            url: '/student_information',
            views: {
                'main_content': {
                    templateUrl: 'templates/freshman_app/student_information.html',
                    controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })
    
        .state('tabs.applications.application.highschool_information', {
            url: '/highschool_information',
            views: {
                'main_content': {
                    templateUrl: 'templates/freshman_app/highschool_information.html',
                    controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })
    
        .state('tabs.applications.application.highschool_coursework', {
            url: '/highschool_coursework',
            views: {
                'main_content': {
                    templateUrl: 'templates/freshman_app/highschool_coursework.html',
                    controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })

        .state('tabs.applications.application.employment', {
            url: '/employment',
            views: {
                'main_content': {
                    templateUrl: 'templates/freshman_app/employment.html',
                    controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })

        .state('tabs.applications.application.college_plans', {
            url: '/college_plans',
            views: {
                'main_content': {
                    templateUrl: 'templates/freshman_app/college_plans.html',
                    controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })

        .state('tabs.applications.application.financial_information', {
            url: '/financial_information',
            views: {
                'main_content': {
                    templateUrl: 'templates/freshman_app/financial_information.html',
                    controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })

        .state('tabs.applications.application.scholarship_information', {
            url: '/scholarship_information',
            views: {
                'main_content': {
                    templateUrl: 'templates/freshman_app/scholarship_information.html',
                    controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })

        .state('tabs.applications.application.essays', {
            url: '/essays',
            resolve: {
                fileNames: function (DataService, $stateParams) {
                    return DataService.getListofDocuments('application', $stateParams.applicationId);
                }
            },
            views: {
                'main_content': {
                    templateUrl: 'templates/freshman_app/essays.html',
                    controller: 'UploadController'
                }
            },
            authenticate: true
        })

        .state('tabs.applications.application.submit', {
            url: '/submit',
            views: {
                'main_content': {
                    templateUrl: 'templates/freshman_app/submit.html',
                    controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })

        .state('tabs.applications.application.confirmation', {
            url: '/confirmation',
            views: {
                'main_content': {
                    templateUrl: 'templates/confirmation.html',
                    controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })
    
        .state('tabs.applications.transfer_application', {
            url: '/transfer_application/:applicationId',
            abstract: true,
            views: {
                'applications-tab@tabs': {
                        templateUrl: 'templates/abstract_transfer_application.html',
                        controller: 'MyApplicationController'
                }
            },
            resolve: {
                application: function (DataService, $stateParams) {
                    return DataService.getItem('transferApplication', $stateParams.applicationID);
                },
                institution: function (DataService) {
                    return DataService.getAllItems('institution');
                },
                employment: function (DataService) {
                    return DataService.getAllItems('employment');
                },
                military: function (DataService) {
                    return DataService.getAllItems('military');
                },
                transfer_activity: function (DataService) {
                    return DataService.getAllItems('transfer_activity');
                },
                volunteer: function (DataService) {
                    return DataService.getAllItems('volunteer');
                },
                award: function (DataService) {
                    return DataService.getAllItems('award');
                },
                child: function (DataService) {
                    return DataService.getAllItems('child');
                },
                activity: function () {
                    return;
                },
                coursework: function () {
                    return;
                },
                university: function () {
                    return;
                },
                scholarship: function () {
                    return;
                }
            },
            authenticate: true           
        })
    
        .state('tabs.applications.transfer_application.student_information', {
            url: '/student_information',
            views: {
                'main_content': {
                        templateUrl: 'templates/transfer_app/student_information.html',
                        controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })
    
        .state('tabs.applications.transfer_application.education', {
            url: '/education',
            reslove: {
                institution: function (DataService) {
                    return DataService.getAllItems('institution');
                }
            },
            views: {
                'main_content': {
                        templateUrl: 'templates/transfer_app/education.html',
                        controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })
    
        .state('tabs.applications.transfer_application.employment', {
            url: '/employment',
            resolve: {
                employment: function (DataService) {
                    return DataService.getAllItems('employment');
                },
                military: function (DataService) {
                    return DataService.getAllItems('military');
                },
                transfer_activity: function (DataService) {
                    return DataService.getAllItems('transfer_activity');
                },
                volunteer: function (DataService) {
                    return DataService.getAllItems('volunteer');
                },
                award: function (DataService) {
                    return DataService.getAllItems('award');
                }
            },
            views: {
                'main_content': {
                        templateUrl: 'templates/transfer_app/employment.html',
                        controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })
    
        .state('tabs.applications.transfer_application.financial_information', {
            url: '/financial_information',
            resolve: {
                child: function (DataService) {
                    return DataService.getAllItems('child');
                }
            },
            views: {
                'main_content': {
                        templateUrl: 'templates/transfer_app/financial_information.html',
                        controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })
    
        .state('tabs.applications.transfer_application.personal_history', {
            url: '/personal_history',
            views: {
                'main_content': {
                        templateUrl: 'templates/transfer_app/personal_history.html',
                        controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })
    
        .state('tabs.applications.transfer_application.essay', {
            url: '/essay',
            resolve: {
                fileNames: function (DataService, $stateParams) {
                    return DataService.getListofDocuments('transferApplication', $stateParams.applicationId);
                }
            },
            views: {
                'main_content': {
                        templateUrl: 'templates/transfer_app/essay.html',
                        controller: 'UploadController'
                }
            },
            authenticate: true
        })
    
        .state('tabs.applications.transfer_application.submit', {
            url: '/submit',
            resolve: {
                application: function (DataService, $stateParams) {
                    return DataService.getItem('transferApplication', $stateParams.applicationID);
                },
                institution: function (DataService) {
                    return DataService.getAllItems('institution');
                },
                employment: function (DataService) {
                    return DataService.getAllItems('employment');
                },
                military: function (DataService) {
                    return DataService.getAllItems('military');
                },
                transfer_activity: function (DataService) {
                    return DataService.getAllItems('transfer_activity');
                },
                volunteer: function (DataService) {
                    return DataService.getAllItems('volunteer');
                },
                award: function (DataService) {
                    return DataService.getAllItems('award');
                },
                child: function (DataService) {
                    return DataService.getAllItems('child');
                },
                activity: function () {
                    return;
                },
                coursework: function () {
                    return;
                },
                university: function () {
                    return;
                },
                scholarship: function () {
                    return;
                }
            },
            views: {
                'main_content': {
                        templateUrl: 'templates/transfer_app/submit.html',
                        controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })
    
        .state('tabs.applications.transfer_application.confirmation', {
            url: '/confirmation',
            views: {
                'main_content': {
                    templateUrl: 'templates/confirmation.html',
                    controller: 'MyApplicationController'
                }
            },
            authenticate: true
        })
    
        .state('tabs.information', {
            url: '/information',
            views: {
                'information-tab': {
                    templateUrl: 'templates/tab-information.html'
                }
            },
            authenticate: true
        })
    
        .state('tabs.user', {
            url: '/user',
            resolve: {
                user: function (UserService) {
                    return UserService.getUser();
                }
            },
            views: {
                'user-tab': {
                    templateUrl: 'templates/tab-user_detail.html',
                    controller: 'UserController'
                }
            }
        });

    $urlRouterProvider.otherwise('/signin');
});