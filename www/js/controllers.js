angular.module('starter.controllers', [])

.controller('NewsCtrl', function($scope) {
})

.controller('FeedCtrl', function($scope,$state, $firebase, $window) {
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
  $scope.loadComments = function(storyId){
    $state.go('tab.story-comments',{storyId:storyId});
  }
})

.controller('CommentsCtrl', function($scope, $stateParams, $firebase, $http, $sce) {
  var apiUrl = "https://hacker-news.firebaseio.com/v0/item/";
  $scope.comments = [];
  var addComment = function(commentId) {
      var refFire = new Firebase(apiUrl).child(commentId);
      var commentRef = $firebase(refFire).$asObject();
      commentRef.indent = 0;
      $scope.comments.push(commentRef);
  };
  var getComments = function(storyId) {
    $http.get(apiUrl+storyId+'.json')
    .success(function(data, status) {
          angular.forEach(data.kids, function(commentId) {
            addComment(commentId);
          })
        })
    .error(function(data, status) {
          /*BOOM*/
      });
  };
  $scope.trust = function(comment){
    return $sce.trustAsHtml(comment);
  };
  $scope.bubbleCheck = function(e){
    if(e.toElement.tagName == "A"){
      e.preventDefault();
      e.stopPropagation();
      e.stopImmediatePropagation();
    }
  };
  $scope.loadMoreComments = function(id,kids,indent) {
    //TODO: Load more comments implementation
  };
  getComments($stateParams.storyId);
})
