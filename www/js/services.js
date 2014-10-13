angular.module('hnIonFire.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('HNFactory', function($http, $q, $log, $firebase) {
  var apiUrl = "https://hacker-news.firebaseio.com/v0";

  return {
    getItem: function(itemId) {
      var deferred = $q.defer();
      $http.get(apiUrl+'/item/'+itemId+'.json')
        .success(function(data) {
            deferred.resolve(data);
          })
        .error(function(msg, code) {
            deferred.reject(msg);
            $log.error(msg, code);
        });
      return deferred.promise;
    },
    getApiUrl: function() {
      return apiUrl;
    }
  }
});
