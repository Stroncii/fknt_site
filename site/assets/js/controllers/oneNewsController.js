angular.module('app')
.controller('oneNewsController',['$scope', '$http', 'appFactory', '$routeParams' , function($scope, $http, appFactory, $routeParams){
  

  console.log('lalo4ka');
  console.log($routeParams);

  appFactory.getOneNewsItem($routeParams.id);



}])