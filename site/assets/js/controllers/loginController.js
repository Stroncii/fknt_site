angular.module('app')
.controller('loginController',[ '$http', '$rootScope', 'loginFactory', '$scope', '$location', function( $http, $rootScope, loginFactory, $scope, $location){
    
   $scope.user = {
      user: '',
      password: ''
  };

   $rootScope.$on('logout', function () {
         sessionStorage.removeItem('user');
         $location.path('/login');
   });

    $scope.loginE = function () {
        var log = loginFactory.logIn($scope.user).then((data) => {
            if (data.login === 'success') {
                $rootScope.user = $scope.user.user;
                $rootScope.logged = true;
                $location.path('/admin');
                sessionStorage.setItem('user', $scope.user.user);
            } else {
                $scope.error = 'error';
            }
        }, () => {
        });

    }
}]);