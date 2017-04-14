angular.module('app')
.controller('loginController',[ '$http', '$rootScope', 'loginFactory', '$scope', '$location', function( $http, $rootScope, loginFactory, $scope, $location){
    
   $scope.user = {
      user: '',
      password: ''
  };
    $scope.loginE = function () {
        var log = loginFactory.logIn($scope.user);
        if (log) {
            $scope.error = 'noerror';
            sessionStorage.setItem('user', $scope.user.user);
            $location.path('/admin');
        } else {
            $scope.error = 'error';
        }
    }
}]);