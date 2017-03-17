angular.module('app')
.controller('mainController',['$scope', '$http', 'appFactory', '$sce', '$translate' , function($scope, $http, appFactory, $sce, $translate){
  console.log('buuu');
  $scope.changeLanguage = function() {
    $translate.use() == 'ua' ? $translate.use('ru') : $translate.use('ua');

  };

  
  appFactory.getNews().then(function(data) {
    $scope.firstNews = data.news[0];
    $scope.news = data.news;
    $scope.news = $scope.news.slice(-($scope.news.length-1));
  });
  appFactory.getLastNews().then(function(data) {
    $scope.lastNews = data.news;
    $scope.smallLastNews = $scope.lastNews.slice(-3);
  });


}])