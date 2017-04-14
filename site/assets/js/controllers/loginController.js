angular.module('app')
.controller('loginController',[ '$http', '$rootScope', 'loginFactory', '$scope', '$location', function( $http, $rootScope, loginFactory, $scope, $location){
    
   $scope.user = {
      user: '',
      password: ''
  };
    $scope.loginE = function () {
        var log = loginFactory.logIn($scope.user).then((data) => {
            if (data.login === 'success') {
                $rootScope.logged = true;
                $location.path('/admin');
                $rootScope.user = $scope.user.user;
                sessionStorage.setItem('user', $scope.user.user);
            } else {
                $scope.error = 'error';
            }
        }, () => {
            console.log('naaahooooooooy');
        });

    }
}]);