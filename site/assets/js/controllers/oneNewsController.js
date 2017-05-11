angular.module('app')
.controller('oneNewsController',['$scope', '$http', 'appFactory', '$routeParams', '$location', '$rootScope' , function($scope, $http, appFactory, $routeParams, $location, $rootScope){

  const getOneNews = function () {
    appFactory.getOneNewsItem($routeParams.id, $rootScope.language).then((data) => {
        $scope.item = data;
        if (!data) {
            $location.path("/error");
        }
    });
  };

  getOneNews();


  let listener = $rootScope.$watch('language', function(newValue, oldValue) {
     if (oldValue && oldValue != newValue) {
       getOneNews();
     }
  });

  $rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
     if (oldValue && oldValue != newValue) {
        listener();       
     }
  });



}])