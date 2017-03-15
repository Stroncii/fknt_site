var app = angular.module('app', ['ngRoute', 'ngSanitize'])
  .config( ['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'templates/main.html'
  })
  .when ('/history', {
      templateUrl: 'templates/history.html'
  })
  .when('/news', {
    templateUrl: 'templates/news.html'
  })
  .when('/admin', {
    templateUrl: 'templates/admin.html'
  })
  .when('/dean', {
    templateUrl: 'templates/dean.html'
  })
  .when('/pmi', {
    templateUrl: 'templates/pmi.html'
  })
  .when('/kn', {
    templateUrl: 'templates/kn.html'
  })
  .when('/ki',{
    controller : function(){
        window.location.replace('/structure/ki/');
    }, 
    template : "<div></div>"
  })
  .when('/philosophy', {
    templateUrl: 'templates/philosophy.html'
  })
  .when('/schedule', {
    templateUrl: 'templates/schedule.html',
    controller: 'scheduleController'
  })
  .when('/consultations', {
    templateUrl: 'templates/consultations.html'
  })
  .when('/process', {
    templateUrl: 'templates/process.html'
  })
  .when('/plans', {
    templateUrl: 'templates/plans.html',
    controller: 'worksController'
  })
  .when('/organizations', {
    templateUrl: 'templates/organizations.html'
  })
  .when('/documents', {
    templateUrl: 'templates/documents.html'
  })
  .when('/specialties', {
    templateUrl: 'templates/specialties.html'
  })
  .when('/specialties/:type', {
    templateUrl: 'templates/specialties.html',
    controller: 'specialitiesController'
  })
  .when('/cooperation', {
    templateUrl: 'templates/cooperation.html'
  })
  .when('/aspirantur', {
    templateUrl: 'templates/aspirantur.html'
  })
  .when('/contacts', {
    templateUrl: 'templates/contacts.html'
  })
  .when('/news/:id', {
    templateUrl: 'templates/news-item.html',
    controller: 'oneNewsController'
  })
  .when('/error', {
    templateUrl: 'templates/error.html'
  })
  .otherwise('/error');


    // use the HTML5 History API
    $locationProvider.html5Mode({
          enabled: true,
          requireBase: false
    }); 
}]);

app.run(function($rootScope, $location, $anchorScroll) {
  //when the route is changed scroll to the proper element.
  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
    console.log("change");
   // if($location.hash()) $anchorScroll();  
  });
});

  
