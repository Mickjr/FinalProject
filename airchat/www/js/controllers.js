angular.module('starter.controllers', ['firebase'])

.controller('DashCtrl', function($scope, $rootScope, $firebase, $firebaseAuth) {
    console.log("Dash Control");
    var ref = new Firebase("https://glowing-heat-2588.firebaseio.com");
    $scope.authObj = $firebaseAuth(ref);
    $scope.authObj.$authWithOAuthPopup("facebook").then(function(authData) {
      $rootScope.currentUser = authData;
      console.log("Logged in as:", authData.uid);
      console.log("Current User Data ", $rootScope.currentUser.facebook.cachedUserProfile.first_name);
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
})

.controller('AdminLoginCtrl', function($scope, $firebase, $firebaseAuth) {
  console.log("Admin Control");
  var ref = new Firebase("https://glowing-heat-2588.firebaseio.com");
  $scope.authObj = $firebaseAuth(ref);
  $scope.adminUser = {};
  $scope.adminlogin = function(){
    $scope.authObj.$authWithPassword({
      email: $scope.adminUser.email,
      password: $scope.adminUser.password
    }).then(function(authData) {
      console.log("Logged in as:", authData.uid);
    }).catch(function(error) {
      console.error("Authentication failed:", error);
    });
  }
  
})

.controller('RegisterCtrl', function($scope, $firebase, $firebaseAuth) {
  console.log("Register Control");
  var ref = new Firebase("https://glowing-heat-2588.firebaseio.com");
  $scope.authObj = $firebaseAuth(ref);
  $scope.registerUser = {};
  $scope.register = function(){
    console.log("in here", $scope.authObj);
    $scope.authObj.$createUser({ 
      email: $scope.registerUser.email,
      password: $scope.registerUser.password
      }).then(function(userData) {
      console.log("User " + userData.uid + " created successfully!");
      return $scope.authObj.$authWithPassword({
      email: $scope.registerUser.email,
      password: $scope.registerUser.password
    });
    }).then(function(authData) {
      console.log("Logged in as:", authData.uid);
    }).catch(function(error) {
      console.error("Error: ", error);
    });
  };
});