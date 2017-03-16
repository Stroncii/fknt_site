angular.module('app').factory ('appFactory', ['$http', function ($http) {
  var fact = {};

  fact.corp = 4;

  fact.getOneNewsItem = function (id) {
      //console.log(`Hey! Our Id is ${id}`);
        return $http({
            method: 'GET',
            url: 'http://fknt.donntu.edu.ua/news-item/read_one.php/' + id
        }).then(function successCallback(response) {
            //console.log("newww");
            //console.log(response);
            return response.data;
        }, function errorCallback(response) {
            //console.log("Error!");
            //console.log(response);
        });;
  }

  fact.getNews = function () {
      let news = $http({
            method: 'GET',
            url: 'http://fknt.donntu.edu.ua/news-item/read.php'
        }).then(function successCallback(response) {
            //console.log("here");
            return response.data;
        }, function errorCallback(response) {
            //console.log("Error!");
            //console.log(response);
        });
    return news;
  };

  fact.getLastNews = function (){
      let lastNews = $http({
            method: 'GET',
            url: 'http://fknt.donntu.edu.ua/news-item/read_last.php'
        }).then(function successCallback(response) {
            return response.data;
        }, function errorCallback(response) {
            //console.log("Error!");
            //console.log(response);
        });
    return lastNews;
  };
  
  return fact;
}]);
