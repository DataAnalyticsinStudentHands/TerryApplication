// Honors Application Web App
angular.module('HonorsApplications',[ 
    'ionic',
    'restangular',
    'ngNotify',
    'databaseServicesModule',
    'TerryControllers',
    'TerryFilters',
    'TerryServices',
    'TerryDirectives'


])

.run(function($ionicPlatform, Restangular, $rootScope, Auth, $q, $state, UserService, ngNotify) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the
        // accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });

    // Set Base URL to connect to DASH RESTFUL webservices
    Restangular.setBaseUrl("http://127.0.0.1:8080/RESTFUL-WS-terry/"); // localhost
    // Restangular.setBaseUrl("http://www.housuggest.org:8888/RESTFUL-WS-0.0.1/");

    // have Restangular available whereever we need it
    $rootScope.Restangular = function() {
        return Restangular;
    }

    //CHECKING IF AUTHENTICATED ON STATE CHANGE - Called in $stateChangeStart
    $rootScope.isAuthenticated = function(authenticate) {
        UserService.getMyUser().then(function(result) {
            console.log("authed");
            result = Restangular.stripRestangular(result)[0];
            //USERNAME & ID TO BE USED IN CONTROLLERS
            $rootScope.uid = result.id.toString();
            $rootScope.uin = result.username.toString();
        },  function(error) {
            if(error.status === 0) { 
                ngNotify.set("INTERNET OR SERVER UNAVAILABLE", {type : "error", sticky : true});
            } else { // LOG THEM OUT
                Auth.clearCredentials();
                console.log("not-authed");
                if(authenticate) $state.go("signin");
            }
        });

        return Auth.hasCredentials();
    }

    //AUTHENTICATE ON CHANGE STATE
    $rootScope.$on("$stateChangeStart", function(event, toState, toParams, fromState, fromParams){
        console.log('$stateChangeStart to '+toState.to+'- fired when the transition begins. toState,toParams : \n',toState, toParams);
        if (toState.authenticate && !$rootScope.isAuthenticated(toState.authenticate)){
            console.log("non-authed");
            // User isn’t authenticated
            $state.go("signin");
            //Prevents the switching of the state
            event.preventDefault(); 
        }
    });
    
    //Logout user by clearing credentials
    $rootScope.logout = function() {
        Auth.clearCredentials();
        console.log("log out");
        $state.go('signin', {}, {
            reload : true
        });
    };	

    // Some watchdogs for fixing ui-route issues Credits: Adam's answer in http://stackoverflow.com/a/20786262/69362
    $rootScope.$on('$stateChangeError',function(event, toState, toParams, fromState, fromParams){
        console.log('$stateChangeError - fired when an error occurs during transition.');
        console.log(arguments);
    });
    
    $rootScope.$on('$stateChangeSuccess',function(event, toState, toParams, fromState, fromParams){
        console.log('$stateChangeSuccess to '+toState.name+'- fired once the state transition is complete.');
    });
    
    $rootScope.$on('$viewContentLoaded',function(event){
        console.log('$viewContentLoaded - fired after dom rendered',event);
    });
    
    $rootScope.$on('$stateNotFound',function(event, unfoundState, fromState, fromParams){
        console.log('$stateNotFound '+unfoundState.to+'  - fired when a state cannot be found by its name.');
        console.log(unfoundState, fromState, fromParams);
    });    

})

.config(function($stateProvider, $urlRouterProvider) {	
    // Set up the various states which the app can be in.

    //signin, this is also the fallback
    $stateProvider
    .state('signin', {
        url: '/signin',
        templateUrl: 'templates/signin.html',
        controller: 'SignInController',
        authenticate : false
    })

    //register
    .state('register', {
        url: "/register",
        templateUrl: "templates/register.html", 
        controller: 'RegisterController',
        authenticate: false
    })

    // setup an abstract state for the tabs directive
    .state('tabs', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        authenticate: true
    })

    .state('tabs.myapplications', {
        url : '/myapplications',
        views : {
            'tab-myapplications' : {
                templateUrl : 'templates/tab-myapplications.html',
                controller : 'MyapplicationsController'
            }
        },
        authenticate: true
    })
    
    .state('tabs.student_information', {
        url: '/myapplication/:applicationId',
        views: {
            'tab-myapplications': {
                templateUrl: 'templates/student_information.html',
                controller: 'MyApplicationController'
            }
        },
        authenticate: true
    })

    .state('tabs.contact', {
        url : '/contact',
        views : {
            'tab-contact' : {
                templateUrl : 'templates/tab-contact.html'				
            }
        },
        authenticate: true
    })

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/signin');  

});