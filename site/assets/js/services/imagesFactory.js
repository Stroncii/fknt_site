angular.module('app').factory ('imagesFactory', ['$http', function ($http) {
  var fact = {};

  fact.getImages = function () {
      
        let images = $http({
            method: 'GET',
            url: '/objects/images/readAll.php'
        }).then(function successCallback(response) { 
            return response.data;
        }, function errorCallback(response) {
            console.log('ERROR!');
            console.log(response);
        });
    return images;
  };

  fact.getUnusedImages = function () {     
        let images = $http({
            method: 'GET',
            url: '/objects/images/readUnused.php'
        }).then(function successCallback(response) { 
            console.log('unused images');
            console.log(response);
            return response.data;
        }, function errorCallback(response) {
            console.log('ERROR!');
            console.log(response);
        });
    return images;
  };

  fact.updateImage = function (path, id) {
    let del = $http({
        method: 'UPDATE',
        url: '/objects/images/update.php',
        data: JSON.stringify({
            path: path,
            news_id: id
        }) 
    }).then (function successCallback(response) { 
            console.log('image deleted from news');
            return response.data;
        }, function errorCallback(response) {
            console.log('ERROR!');
            console.log(response);
        });
        return del;
  };

  fact.deleteImage = (path) => {
    let del = $http({
        method: 'DELETE',
        url: '/objects/images/delete.php',
        data: JSON.stringify({
            path: path
        }) 
    }).then (function successCallback(response) { 
            console.log('image deleted');
            return response.data;
        }, function errorCallback(response) {
            console.log('ERROR!');
            console.log(response);
        });

        return del;

  }

  fact.addImageToNews = (id, path) => {
    let del = $http({
        method: 'PUT',
        url: '/objects/images/updated.php',
        data: JSON.stringify({
            path: path,
            id: id
        }) 
    }).then (function successCallback(response) { 
            console.log('image added');
            return response.data;
        }, function errorCallback(response) {
            console.log('ERROR!');
            console.log(response);
        });

        return del;
  }

  return fact;
}]);
