angular.module('app').factory ('appFactory', ['$http', function ($http) {
  var fact = {};

  fact.corp = 4;

  fact.getOneNewsItem = function (id, language) {
      //console.log(`Hey! Our Id is ${id}`);
        return $http({
            method: 'GET',
            url: '/objects/news/read_one.php?language=' + language + '&id=' + id
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
        });;
  }

  fact.getNews = function (language) {
      console.log(`What language is it ${language}`);
      let news = $http({
            method: 'GET',
            url: '/objects/news/read.php?language=' + language
        }).then(function successCallback(response) {         
            return response.data;
        }, function errorCallback(response) {
        });
    return news;
  };

  fact.getLastNews = function (language){
      let lastNews = $http({
            method: 'GET',
            url: '/objects/news/read_last.php?language=' + language
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
        });
    return lastNews;
  };
  
  return fact;
}]);
