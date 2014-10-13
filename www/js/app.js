angular.module('hnIonFire', ['ngAnimate','ionic', 'hnIonFire.controllers', 'hnIonFire.services', 'firebase', 'hnIonFire.filters'])

.run(function($ionicPlatform, $templateCache, $http) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleLightContent();
    }
    if(navigator.splashscreen){
      navigator.splashscreen.hide();
    }
    var templates = [
      "feed",
      "story-comments"
    ];
    templates.forEach(function(tpl){
      $http.get('templates/'+tpl+'.html', { cache: $templateCache });
    });
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('feed', {
      url: '/feed',
      templateUrl: 'templates/feed.html',
      controller: 'FeedCtrl'
    })
    .state('story-comments', {
      url: '/story/comments/:storyId',
      templateUrl: 'templates/story-comments.html',
      controller: 'CommentsCtrl'
    });

  $urlRouterProvider.otherwise('/feed');

});
