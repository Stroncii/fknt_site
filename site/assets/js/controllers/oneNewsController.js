angular.module('app')
.controller('oneNewsController',['$scope', '$http', 'appFactory', '$routeParams', '$location' , function($scope, $http, appFactory, $routeParams, $location){
  

  console.log('lalo4ka');
  console.log($routeParams);

  appFactory.getOneNewsItem($routeParams.id).then((data) => {
      $scope.item = data;
      if (!data) {
          $location.path("#!/error");
      }
  });



}])