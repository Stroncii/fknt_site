angular.module('app').factory ('imagesFactory', ['$http', function ($http) {
  var fact = {};

  fact.getImages = function () {
      
        let images = $http({
            method: 'GET',
            url: '/objects/images/readAll.php'
        }).then(function successCallback(response) { 
            console.log('images');
            console.log(response);
            return response.data;
        }, function errorCallback(response) {
            console.log('ERROR!');
            console.log(response);
        });
    return images;
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

  return fact;
}]);
