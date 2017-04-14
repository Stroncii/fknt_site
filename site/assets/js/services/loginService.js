angular.module('app').factory ('loginFactory', ['$http', function ($http) {
  var fact = {};

  fact.logIn = function (user) {
    if (user.user == 'daniella'){
        console.log('hey!');
        return true;
    }
    return false;
  };
  
  
  return fact;
}]);
