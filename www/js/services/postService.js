/**
 * Created by Seva on 07/04/2016.
 */

angular.module('garage')
  .service('postService', ['$q', '$http','$routeParams', function ($q, $http, $routeParams) {
      this.loadPosts = function(userId){
        return $http({
          method: 'GET',
          params: {user : userId.toString()},
          url: 'http://192.168.100.5:3000/posts'
          //withCredentials:true
        });
      };

      this.deletePost = function(id, userId){
        return $http({
          method: 'DELETE',
          params: {user : userId.toString()},
          url: 'http://192.168.100.5:3000/posts/'+ id
        })
      };
      this.getPost = function(userId){
          return $http({
            method: 'GET',
            params: {user : userId.toString()},
            url:'http://192.168.100.5:3000/posts/'+ $routeParams.id
          });
      };

    this.addComment = function (id, comment, userId) {
      return $http({
        method: 'PUT',
        params: {user : userId.toString()},
        url: 'http://192.168.100.5:3000/posts/comments/'+ id,
        data: comment
      });
    };

    this.getComments = function(id, userId){
      return $http({
        method: 'GET',
        params: {user : userId.toString()},
        url: 'http://192.168.100.5:3000/posts/comments/'+ id
      })
    }
  }]);
