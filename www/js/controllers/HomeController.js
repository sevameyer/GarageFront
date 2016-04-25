/**
 * Created by Seva on 06/04/2016.
 */
//@todo change all success to then
angular.module('garage')
  .controller('HomeCtrl',['$scope', '$http','sharedUser', '$state',
    function ($scope, $http, sharedUser, $state) {

    $scope.user = {email: "", password: "", name: ""};
    $scope.wrongLogin = false;
    $scope.loginError = "";

    $scope.local_login = function () {
      $http.post("http://192.168.100.5:3000/login", $scope.user).then(function successCallback(data, status) {
        console.log(data.data);
        sharedUser.setProperty(data.data);
        //console.log("shared user: "+ sharedUser.getProperty().name);
        //console.log(sharedUser.getProperty().name);
        $scope.wrongLogin = false;
        $state.go('main');

      },
      function errorCallback(data, status){
          $scope.wrongLogin=true;
          console.log("Error "+ data);
          $scope.loginError = "The email or the password is not correct"; //todo print out a nice error message
      });
    };

    $scope.fb_login = function () {
        $http.get("http://192.168.100.5:3000/auth/facebook").success(function(data, status){
          console.log(data);
          sharedUser.setProperty(data);

          $state.go('main');
        });
    };

    var google_login = function () {

    };

    $scope.open_reg = function(){
      $state.go("reg");
    };


    $scope.user_reg = function () {
      $http.post("http://192.168.100.5:3000/signup", $scope.user).success(function(data, status) {

        sharedUser.setProperty(data);
        $state.go('main');
      });
    };

  }]);
