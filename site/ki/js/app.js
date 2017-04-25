var app = angular.module('appKI', ['ngRoute', 'ngSanitize', 'pascalprecht.translate'])
  .config( ['$routeProvider', '$locationProvider', '$translateProvider', function($routeProvider, $locationProvider, $translateProvider) {
  $routeProvider
  .when('/ki/', {
    templateUrl: 'templates/main.html'
  })
  .when ('/ki/history', {
      templateUrl: 'templates/history.html'
  })
  .when ('/ki/professors', {
      templateUrl: 'templates/professors.html'
  })
  .when ('/ki/science', {
      templateUrl: 'templates/science.html'
  })
  .when ('/ki/contacts', {
      templateUrl: 'templates/contacts.html'
  })





  $translateProvider.translations('uk', {
    // HEADERS

    'TITLE': 'Факультет комп\'ютерних наук і технологій',
    'HISTORY': 'Історія'
    
  });
 
  $translateProvider.translations('ru', {

    // HEADERS

    'TITLE': 'Факультет компьютерных наук и технологий',
    'HISTORY': 'История'
  });

$translateProvider.translations('en', {

    // HEADERS

    'TITLE': 'Faculty of Computer Sciences and Technologies',
    'HISTORY': 'История'
  });

  $translateProvider.preferredLanguage('uk');


    // use the HTML5 History API
    $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
    }); 
}]);

app.run(function($rootScope, $location, $anchorScroll, $translate, $routeParams) {
    console.log('hey');
  //when the route is changed scroll to the proper element.
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    
   // if($location.hash()) $anchorScroll();  
  });
  $rootScope.language = 'uk';

  if (localStorage.getItem('ki-path')) {  
    $location.url('/ki/' + localStorage.getItem('ki-path'));
    localStorage.clear('ki-path');
  }
  
  if (sessionStorage.getItem('user')) {
    $rootScope.logged = true;
    $rootScope.user = sessionStorage.getItem('user');
  }
});

  
