angular.module('app')
.controller('mainController',['$scope', '$http', 'appFactory', '$sce', '$translate', '$rootScope' , function($scope, $http, appFactory, $sce, $translate, $rootScope){
  
  $scope.changeLanguage = function() {
    $translate.use() == 'uk' ? $translate.use('ru') : $translate.use('uk');
    $rootScope.language = $translate.use();
  };

  
  appFactory.getNews($rootScope.language).then(function(data) {
    $scope.firstNews = data.news[0];
    $scope.news = data.news;
    $scope.news = $scope.news.slice(-($scope.news.length-1));
  });
  appFactory.getLastNews($rootScope.language).then(function(data) {
    $scope.lastNews = data.news;
    $scope.smallLastNews = $scope.lastNews.slice(-3);
  });


}])