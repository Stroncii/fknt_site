angular.module('app')
.controller('adminController',['$scope', '$rootScope', 'appFactory', 'usersFactory', function($scope, $rootScope, appFactory, usersFactory){


    // item - текущие рабочие куски одного языка.

    //currentItem - полный элемент
    //setEditable - булевая переменная, показывающая, что элемент начал изменяться.

  $scope.mode = 'add';
  $scope.lang="ru";

  init();

  function init () {
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

    usersFactory.getUsers().then((data) => {
        console.log(data);
        $scope.users = data.users;
    });

};

function userInit () {
    $scope.newUser = {
            level: '',
            username: 'hohoho',
            password: ''
        };
};


    $scope.setEditableStatus = (status) => {
        $scope.isEditable = status;
    };

  $scope.changeLanguage = function () {
    $scope.item = $scope.currentItem[$scope.lang];
  };

  $scope.updateNewsItem = (id) => {
    appFactory.getFullNews(id).then(function(data) {
        setEditable(data);
    });
  };

  $scope.update = () => {
    appFactory.updateNews($scope.currentItem).then(function(data){
         console.log('updated');
         console.log(data);
     })
  };

  $scope.deleteNewsItem = (id) => {
     appFactory.deleteItem(id).then(function(data){
         console.log('deleted');
     })
  };

  function setEditable (item) {
     $scope.currentItem = item;
     setDefaults (item);
  };

  function setDefaults () { 
     console.log($scope.currentItem);
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
    console.log($scope.currentItem);
  };
  

  $scope.addNews = function () {
      appFactory.addNewsItem($scope.currentItem).then(function(data){
            console.log("yaaaa");
            $scope.setEditableStatus(false);
            init();
      });
  };

  $scope.changeType = (state) => {
    $scope.setEditableStatus(false);
    init();
  };

  $scope.deleteUser = function (id) {
      console.log('delete ' + id);
    usersFactory.deleteUser(id).then((data) => {
        console.log('deleted')
    });
  };

  $scope.addUser = function () {
      usersFactory.addUser($scope.newUser).then(() => {
          $scope.isUserEditable = false;
      });
  };

  $scope.changeUser = function () {
      usersFactory.updateUser($scope.newUser).then(() => {
          $scope.isUserEditable = false;
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

  $



}])