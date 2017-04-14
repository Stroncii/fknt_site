angular.module('app')
.controller('loginController',[ '$http', '$rootScope', 'loginFactory', '$scope', '$location', function( $http, $rootScope, loginFactory, $scope, $location){
    
   $scope.user = {
      user: '',
      password: ''
  };
    $scope.loginE = function () {
        var log = loginFactory.logIn($scope.user).then((data) => {
            console.log('data')
            console.log(data);
        }, () => {
            console.log('naaahooooooooy');
        });

    }
}]);