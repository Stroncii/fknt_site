angular.module('app')
.controller('oneNewsController',['$scope', '$http', 'appFactory', '$routeParams', '$location', '$rootScope' , function($scope, $http, appFactory, $routeParams, $location, $rootScope){
  

  //console.log('lalo4ka');
  //console.log($routeParams);

  const getOneNews = function () {
    appFactory.getOneNewsItem($routeParams.id, $rootScope.language).then((data) => {
        $scope.item = data;
        if (!data) {
            $location.path("/error");
        }
    });
  };

  getOneNews();


  $rootScope.$watch('language', function(newValue, oldValue) {
     if (oldValue && oldValue != newValue) {
       getOneNews();
       console.log($scope.item);
     }
  });



}])