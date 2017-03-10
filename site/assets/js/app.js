var app = angular.module('app', ['ngRoute'])
  .config( ['$routeProvider', function($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'templates/main.html'
  })
  .when ('/history', {
      templateUrl: 'templates/history.html'
  })
  .when('/news', {
    templateUrl: 'news.html'
  })
  .when('/admin', {
    templateUrl: 'templates/admin.html'
  })

}]);


app.controller('mainController',['$scope',function($scope){
  $scope.homepage = "Главная";

  console.log($scope);
}]);
