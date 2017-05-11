angular.module('app').factory('usersFactory', ['$http', function ($http) {
  var fact = {};


  fact.getUsers = function () {
      
        let users = $http({
            method: 'GET',
            url: '/objects/users/read.php'
        }).then(function successCallback(response) { 
            return response.data;
        }, function errorCallback(response) {
        });
    return users;
  };

  fact.addUser = (user) => {
    let users = $http({
            method: 'POST',
            url: '/objects/users/create.php',
            data: JSON.stringify(user)
        }).then(function successCallback(response) { 
            return response.data;
        }, function errorCallback(response) {
        });
    return users;
  };

  fact.updateUser = (user) => {
    let users = $http({
            method: 'PUT',
            url: '/objects/users/update.php',
            data: JSON.stringify(user)
        }).then(function successCallback(response) { 
            return response.data;
        }, function errorCallback(response) {
        });
    return users;
  };


  fact.deleteUser = function (id) {
      let users = $http({
            method: 'DELETE',
            url: '/objects/users/delete.php',
            data: JSON.stringify({
                id: id
            })
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
        });
    return users;
  }
  
  return fact;
}]);
