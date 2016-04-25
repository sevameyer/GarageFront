// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('garage', ['ionic', 'angularGrid', 'ngRoute', 'ngCordova','ui.bootstrap', 'ui.router'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider){
  $stateProvider

    .state('home', {
      url: '/home',
      templateUrl: 'partials/home.html',
      controller: 'HomeCtrl'
    })
    .state('main', {
      url:'/main',
      templateUrl: 'partials/main.html',
      controller: 'MainCtrl'
    })
    .state('post', {
      url: '/post',
      templateUrl: 'partials/add_post.html',
      controller: 'PostCtrl'
    })
    .state('reg', {
      url: '/reg',
      templateUrl: 'partials/reg_user.html',
      controller: 'HomeCtrl'
    })
    .state('myposts',{
      url: '/myposts',
      templateUrl: 'partials/my_posts.html',
      controller: 'PostCtrl'
    });
  $urlRouterProvider.otherwise('/home');
})
  .controller('AppCtrl', ['$scope','$location','$http', function($scope, $location, $http){

    //checks which path is displayed and makes the corresponding button active in footer
    $scope.isActive = function (viewLocation) {
      return (viewLocation === $location.path());
    };

    $scope.isSearching = false;

    $scope.logout = function () {
      $http({
        method: 'GET',
        url: 'http://192.168.100.2:3000/logout'
      })
    }
  }]);
