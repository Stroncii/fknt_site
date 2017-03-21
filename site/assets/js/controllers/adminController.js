angular.module('app')
.controller('adminController',['$scope', '$rootScope', 'appFactory', function($scope, $rootScope, appFactory){



  $scope.htmlVariable = 'lalalalalalalala';
  $scope.lang="ru";
  console.log($scope.lang);

  init();

  function init () {
     
  };

  $scope.changeLanguage = function () {
    console.log('change langggg ' + $scope.lang);
  };

  $scope.updateNewsItem = (id) => {
    appFactory.getFullNews(id).then(function(data) {
        console.log(data)
        $scope.fullNews = data;
    });
  };

  $scope.deleteNewsItem = (id) => {
     appFactory.deleteItem(id).then(function(data){
         console.log('deleted');
     })
  };


}])