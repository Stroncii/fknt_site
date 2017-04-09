angular.module('app').factory ('groupsFactory', ['$http', function ($http) {
  var fact = {};

  fact.getGroups = function () {
      
        let groups = $http({
            method: 'GET',
            url: '/objects/groups/read.php'
        }).then(function successCallback(response) { 
            console.log(response);
            return response.data;
        }, function errorCallback(response) {
            console.log('ERROR!');
            console.log(response);
        });
    return groups;
  };

  return fact;
}]);
