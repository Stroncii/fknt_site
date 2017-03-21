angular.module('app')
.controller('adminController',['$scope', '$rootScope', 'appFactory', function($scope, $rootScope, appFactory){



  $scope.htmlVariable = 'lalalalalalalala';
  $scope.lang="ru";
  console.log($scope.lang);

  init();

  function init () {
     
  };

  $scope.changeLanguage = function () {
    console.log('change langggg');
  };

  $scope.updateNewsItem = (id) => {
    appFactory.getFullNews(id).then(function(data) {
        
        console.log(data);
    });
  };

  $scope.deleteNewsItem = (id) => {
    console.log('DELETE EPTA ' + id);
  };


}])