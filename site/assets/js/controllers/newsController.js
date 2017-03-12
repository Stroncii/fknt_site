angular.module('app')
.controller('mainController',['$scope', '$http', 'appFactory', '$sce' , function($scope, $http, appFactory, $sce){
  

  $scope.news = appFactory.getNews();
  $scope.lastNews = appFactory.getLastNews();

}])