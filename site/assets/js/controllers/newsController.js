angular.module('app')
.controller('mainController',['$scope', '$http', 'appFactory', '$sce' , function($scope, $http, appFactory, $sce){
  

  appFactory.getNews().then(function(data) {
    $scope.firstNews = data.news[0];
    $scope.news = data.news;
  });
  appFactory.getLastNews().then(function(data) {
    console.log(data);
    $scope.lastNews = data.news;
    $scope.smallLastNews = $scope.lastNews.slice(-3);
  });


}])