/**
 * Created by Seva on 07/04/2016.
 */

angular.module('garage')
  .controller('MainCtrl', ['$scope', 'postService', '$uibModal', 'sharedUser', function ($scope, postService, $uibModal, sharedUser) {

    $scope.posts = [];
    $scope.selected_post = {};
    $scope.angularGridOptions = {
      gridWidth : 150,
      gutterSize : 10,
      refreshOnImgLoad: false
    };

    //postService.getPost().success(function (data) {
    //  $scope.selected_post = data;
    //});

    postService.loadPosts(sharedUser.getProperty()._id).success(function (data) {
      $scope.posts = data;

      for (var i = 0; i < $scope.posts.length; i++) {
        $scope.posts[i].image = "http://192.168.100.5:3000/" + $scope.posts[i].image.replace('\\', "/");

      }
    });

    $scope.open = function (post) {
      console.log("this is what I give:" + post.price);
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'post_modal.html',
        controller: 'PostModalCtrl',
        size: '',
        resolve: {
          post: function () {
            return post;
          }
        }

      });

      modalInstance.result.then(function () {
        //$scope.selected = selectedItem;
        console.log("modal was closed");
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };

  }])

  .controller('PostModalCtrl', ['$scope', '$uibModalInstance', 'post', 'postService','sharedUser',
    function ($scope, $uibModalInstance, post, postService, sharedUser) {
    $scope.post = post;
    $scope.comments = [];
    $scope.comment = {
      text:"",
      author: sharedUser.getProperty().name
    };

    $scope.close = function() {
      $uibModalInstance.close();
    };

    postService.getComments($scope.post._id, sharedUser.getProperty()._id).success(function (data) {
      $scope.comments = data;
    });

    $scope.addComment = function () {
      postService.addComment($scope.post._id, $scope.comment, sharedUser.getProperty()._id);
        $scope.comments.push($scope.comment);
    };

  }]);
