angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {
  $scope.login = function(){
    console.log("holla");
  };
})

.controller('AdminLoginCtrl', function($scope, Chats) {
  console.log("holla 2");
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('RegisterCtrl', function($scope, Friends) {
  console.log("holla 3");
  $scope.friends = Friends.all();
})