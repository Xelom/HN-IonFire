angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('HNFactory', function($http, $q, $log) {
  var apiUrl = "https://hacker-news.firebaseio.com/v0/item/";

  return {
    getItem: function(itemId) {
      var deferred = $q.defer();
      $http.get(apiUrl+itemId+'.json')
        .success(function(data) {
            deferred.resolve(data);
          })
        .error(function(msg, code) {
            deferred.reject(msg);
            $log.error(msg, code);
        });
      return deferred.promise;
    }
  }
});
