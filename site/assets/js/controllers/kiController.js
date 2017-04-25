angular.module('app')
.controller('kiController',['$scope', '$http', 'appFactory', '$routeParams', '$location', '$anchorScroll' , function($scope, $http, appFactory, $routeParams, $location, $anchorScroll){

  console.log('we are here');
  console.log($routeParams);
}]);