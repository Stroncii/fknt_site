angular.module('app')
.controller('groupsController',['$scope', '$http', 'groupsFactory', '$sce', '$translate', '$rootScope' , function($scope, $http, groupsFactory, $sce, $translate, $rootScope){
  
 function init () {
     console.log('initialization group');
     $scope.groups = getGroups();
 }


 function getGroups () {
     groupsFactory.getGroups().then((data) => {
        console.log(data);
     });
 }

 init();

}])