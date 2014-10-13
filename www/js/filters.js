angular.module('hnIonFire.filters', [])

.filter('timeago', function() {
  return function(input) {
    return moment.unix(input).fromNow();
  }
});
