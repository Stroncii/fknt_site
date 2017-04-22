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
            console.log('small cover deleted');
            return response.data;
        }, function errorCallback(response) {
            console.log('ERROR!');
            console.log(response);
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
            console.log('full cover deleted');
            return response.data;
        }, function errorCallback(response) {
            console.log('ERROR!');
            console.log(response);
        });

        return del;
  }


  return fact;
}]);
