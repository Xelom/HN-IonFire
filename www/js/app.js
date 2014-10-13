angular.module('starter', ['ngAnimate','ionic', 'starter.controllers', 'starter.services', 'firebase', 'hnIonFire.filters'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('feed', {
      url: '/feed',
      templateUrl: 'templates/tab-feed.html',
      controller: 'FeedCtrl'
    })
    .state('story-comments', {
      url: '/story/comments/:storyId',
      templateUrl: 'templates/story-comments.html',
      controller: 'CommentsCtrl'
    });

  $urlRouterProvider.otherwise('/feed');

});
