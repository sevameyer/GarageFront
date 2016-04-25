/**
 * Created by Seva on 07/04/2016.
 */

angular.module("garage")
  .service('sharedUser', ['$http', function($http){
    this.user = {} ;

    this.getProperty = function () {
      return this.user;
    };

    this.setProperty = function(data){
      this.user = data;
    };

    this.getUserPosts = function(){
      var user_email = this.user.email;

      return $http({
        method: 'GET',
        params: {user : this.user._id.toString() },
        url: 'http://192.168.100.5:3000/users/posts/'+ user_email
      })

    };
  }]);
