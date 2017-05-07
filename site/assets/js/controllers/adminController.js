angular.module('app')
.controller('adminController',['$scope', '$rootScope', 'appFactory', 'usersFactory', '$location', function($scope, $rootScope, appFactory, usersFactory, $location){


    // item - текущие рабочие куски одного языка.

    //currentItem - полный элемент
    //setEditable - булевая переменная, показывающая, что элемент начал изменяться.

  $scope.mode = 'add';
  $scope.lang="ru";
  if (!$rootScope.logged) {
      $location.path('/login')
  }
  init();

  function init () {
    $scope.user = 'lalka';
    $scope.isEditable = false;
    $scope.isUserEditable = false;
    $scope.userMode = 'add';
    userInit();
    $scope.item = {
            content: 'lalalalalalalala',
            synopsis: '',
            title: ''
    };
    $scope.currentItem = {
        ru: {
            content: '',
            synopsis: '',
            title: ''
        },
        uk: {
            content: '',
            synopsis: '',
            title: ''
        },
        en: {
            content: '',
            synopsis: '',
            title: ''
        },
        images_nums: '1'
    };

    $scope.isAdded = {
        ru: false,
        uk: false,
        en: false
    }

    getUsers();

};

function userInit () {
    $scope.newUser = {
            level: '',
            username: 'hohoho',
            password: ''
        };
};

function getUsers () {
       usersFactory.getUsers().then((data) => {
           $scope.users = data.users;
       });
    }


    $scope.setEditableStatus = (status) => {
        $scope.isEditable = status;
    };

  $scope.changeLanguage = function () {
    $scope.item = $scope.currentItem[$scope.lang];
  };

  $scope.updateNewsItem = (id) => {
    appFactory.getFullNews(id).then(function(data) {
        setEditable(data);
        $rootScope.$broadcast('updateNews');
    });
  };

  $scope.update = () => {
    appFactory.updateNews($scope.currentItem).then(function(data){
         $rootScope.$broadcast('updateNews');
     })
  };

  $scope.deleteNewsItem = (id) => {
     appFactory.deleteItem(id).then(function(data){
         $rootScope.$broadcast('updateNews');
     })
  };

  function setEditable (item) {
     $scope.currentItem = item;
     setDefaults (item);
  };

  function setDefaults () { 
     $scope.isEditable = false;
     $scope.item = $scope.currentItem[$scope.lang];
  }

  $scope.cancel = function () {
    if ($scope.mode === 'edit') {
        setDefaults();
    } else {
        init();
    }
  };

  $scope.addPart = function () {
    $scope.currentItem[$scope.lang] = $scope.item;
    $scope.setEditableStatus(false);
    $scope.isAdded[$scope.lang] = true;
  };
  

  $scope.addNews = function () {
      appFactory.addNewsItem($scope.currentItem).then(function(data){
            $scope.setEditableStatus(false);
            init();
            $rootScope.$broadcast('updateNews');
      });
  };

  $scope.changeType = (state) => {
    $scope.setEditableStatus(false);
    init();
  };

  $scope.deleteUser = function (id) {
    usersFactory.deleteUser(id).then((data) => {
        $rootScope.$broadcast('updateUser');
    });
  };

  $scope.addUser = function () {
      usersFactory.addUser($scope.newUser).then(() => {
          $scope.isUserEditable = false;
          $rootScope.$broadcast('updateUser');         
      });
  };

  $scope.changeUser = function () {
      usersFactory.updateUser($scope.newUser).then(() => {
          $scope.isUserEditable = false;
          $rootScope.$broadcast('updateUser');          
      });
  }

  $scope.updateUser = function (user) {
    $scope.newUser.id = user.id;
    $scope.newUser.username = user.username;
    $scope.newUser.level = user.level;
    $scope.newUser.email = user.email;
  };

  $scope.setUserMode = () => {
      console.log('dauni');
      userInit();
  };


$rootScope.$on('updateUser', function () {
    getUsers();
});



// DAD
$scope.updatePosition = function (event, ui) {
    let positions = [];
    $scope.allNews.map((item, index) => {
        positions.push(item.id);
    })
    appFactory.updatePositions(positions).then(function(data) {
        setEditable(data);
        $rootScope.$broadcast('updateNews');
    });
}


}])