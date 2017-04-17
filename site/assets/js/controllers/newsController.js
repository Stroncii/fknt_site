angular.module('app')
.controller('mainController',['$scope', '$http', 'appFactory', '$sce', '$translate', '$rootScope', '$location', function($scope, $http, appFactory, $sce, $translate, $rootScope, $location){
  
  $scope.changeLanguage = function(language) {
    $translate.use(language);
    $rootScope.language = language;
  };

  $scope.logout = function () {
    $rootScope.logged = false;
    $rootScope.$broadcast ('logout');
    $location.path('/login');
  };

  function getNews () {
     appFactory.getNews($rootScope.language).then(function(data) {
        $scope.firstNews = data.news[0];
        $scope.news = data.news;
        $scope.news = $scope.news.slice(-($scope.news.length-1));
        $scope.allNews = data.news;
    });
    appFactory.getLastNews($rootScope.language).then(function(data) {
        $scope.lastNews = data.news;
        $scope.smallLastNews = $scope.lastNews.slice(-3);
    });
  };

  getNews();


  $rootScope.$on('updateNews', function () {
    getNews();
  });

  $rootScope.$watch('language', function(newValue, oldValue) {
     if (oldValue && oldValue != newValue) {
       getNews();
     }
  });


}])