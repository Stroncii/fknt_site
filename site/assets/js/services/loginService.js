angular.module('app').factory ('loginFactory', ['$http', function ($http) {
  var fact = {};

  fact.logIn = function (user) {
    let log = $http({
            method: 'POST',
            url: '/objects/users/login.php',
            data: JSON.stringify({
                username: user.user,
                password: user.password
            })
        }).then(function successCallback(response) {
            console.log(response);       
            return response.data;
        }, function errorCallback(response) {
            console.log(response);
        });
    return log;
  };
  
  
  return fact;
}]);
