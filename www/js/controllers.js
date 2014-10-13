angular.module('hnIonFire.controllers', [])

.controller('FeedCtrl', function($scope,$state, $firebase, $window, $ionicLoading, HNFactory) {
  $scope.topstories = [];
  var ref = new Firebase(HNFactory.getApiUrl()).child("topstories");
  var topstoriesRef = $firebase(ref).$asArray();
  $ionicLoading.show({
    template: 'Fetching Top Stories...'
  });
  var addStory = function(story, isNew) {
      var refStory = new Firebase(HNFactory.getApiUrl()).child("item").child(story.$value);
      var storyRef = $firebase(refStory).$asObject();
      if(isNew) {
        $scope.topstories.splice(story.$id,0,storyRef);
      } else {
        $scope.topstories.splice(story.$id,1,storyRef);
      }
  };
  topstoriesRef.$loaded()
      .then(function(data) {
          $ionicLoading.hide();
          angular.forEach(data, function(story){
            addStory(story,true);
          });
      });
  topstoriesRef.$watch(function(data) {
    if(data.event === "child_changed") {
      addStory(topstoriesRef.$getRecord(data.key), false);
    }
  });
  $scope.openUrl = function(url) {
    $window.open(url);
  };
  $scope.loadComments = function(storyId){
    $state.go('story-comments',{storyId:storyId});
  }
})

.controller('CommentsCtrl', function($scope, $stateParams, $firebase, $http, $sce, $ionicLoading, HNFactory) {
  $scope.comments = [];
  $ionicLoading.show({
    template: 'Fetching latest comments for you...'
  });
  var addComment = function(commentId) {
      HNFactory.getItem(commentId).then(function(item){
        item.indent = 0;
        item.moreToLoad = 'avail';
        $scope.comments.push(item);
      });
  };
  var getComments = function(storyId) {
    HNFactory.getItem(storyId).then(function(item){
      angular.forEach(item.kids, function(kiddo) {
        addComment(kiddo);
      });
      $ionicLoading.hide();
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
  $scope.loadMoreComments = function(comment) {
    comment.moreToLoad = 'loading';
    angular.forEach(comment.kids, function(kiddo) {
      var max = $scope.comments.length;
      HNFactory.getItem(kiddo).then(function(item) {
        item.indent = comment.indent + 1;
        for(var i=0;i<max;i++) {
          if($scope.comments[i].id === comment.id) {
            $scope.comments.splice(i+1,0,item);
            comment.moreToLoad = 'done';
            break;
          }
        }
      });
    });
  };
  getComments($stateParams.storyId);
})
