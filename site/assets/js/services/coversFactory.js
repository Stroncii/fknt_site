angular.module('app').factory ('coversFactory', ['$http', function ($http) {
  var fact = {};

  fact.deleteSmallCover = (id) => {
    let del = $http({
        method: 'DELETE',
        url: '/objects/news/remove_small_cover.php',
        data: JSON.stringify({
            news_id: id
        }) 
    }).then (function successCallback(response) { 
            return response.data;
        }, function errorCallback(response) {
        });

        return del;
  }

  fact.deleteFullCover = (id) => {
    let del = $http({
        method: 'DELETE',
        url: '/objects/news/remove_full_cover.php',
        data: JSON.stringify({
            news_id: id
        }) 
    }).then (function successCallback(response) { 
            return response.data;
        }, function errorCallback(response) {
        });

        return del;
  }


  return fact;
}]);
