angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
.controller('SearchCtrl', function($scope, $firebase, $http, $window) {
  $scope.topstories = [];
  var ref = new Firebase("https://hacker-news.firebaseio.com/v0/topstories");
  var sync = $firebase(ref);
  var topstoriesRef = sync.$asArray();
  var addStory = function(story, isNew) {
      var refStory = new Firebase("https://hacker-news.firebaseio.com/v0/item").child(story.$value);
      var storyRef = $firebase(refStory).$asObject();
      if(isNew) {
        $scope.topstories.splice(story.$id,0,storyRef);
      } else {
        $scope.topstories.splice(story.$id,1,storyRef);
      }
  };
  topstoriesRef.$loaded()
      .then(function(data) {
          angular.forEach(data, function(story){
            addStory(story,true);
          });
      });
  topstoriesRef.$watch(function(data) {
    if(data.event === "child_changed") {
      addStory(topstoriesRef.$getRecord(data.key), false);
    }
  });
  $scope.goToUrl = function(url) {
    $window.open(url);
  };
  $scope.getTime = function(time) {
    var sanitizedTime = moment(time);
    return sanitizedTime.fromNow();
  };

})
.controller('PlaylistCtrl', function($scope, $stateParams, $http, $ionicPopover) {
    var url = 'http://ddragon.leagueoflegends.com/cdn/4.4.3/data/en_US/mastery.json';
    $http.get(url).
  success(function(data, status, headers, config) {
    $scope.masteries = data;
  }).
  error(function(data, status, headers, config) {
    var excp = "";
  });

  $ionicPopover.fromTemplateUrl('my-popover.html', {
    scope: $scope,
  }).then(function(popover) {
    $scope.popover = popover;
  });
  $scope.openPopover = function($event, masteryId) {
    $scope.currentMasteryId = masteryId;
    $scope.popover.show($event);
  };
  $scope.closePopover = function() {
    $scope.popover.hide();
  };
  //Cleanup the popover when we're done with it!
  $scope.$on('$destroy', function() {
    $scope.popover.remove();
  });
});
