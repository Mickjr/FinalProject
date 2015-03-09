demo.controller('LoginCtrl', function($scope, $rootScope, $firebase, $firebaseAuth, $location) {
    console.log("Login Control");

    $scope.myInterval = 5000;
		$scope.slides = [{image: './img/1.jpg', text: 'Welcome to AirChat!'},
						{image: './img/2.jpg', text: 'Welcome to AirChat!'},
						{image: './img/3.jpg', text: 'Welcome to AirChat!'}
		];

    var ref = new Firebase("https://glowing-heat-2588.firebaseio.com");
    $rootScope.authObj = $firebaseAuth(ref);

    $scope.facebooklogin = function(){   
	    $rootScope.authObj.$authWithOAuthPopup("facebook").then(function(authData) {
	      $rootScope.currentUser = authData;
	      console.log("Logged in as:", authData.uid);
	      console.log("Current User Data ", $rootScope.currentUser.facebook.cachedUserProfile.first_name);
	      $location.path('/home');
	    }).catch(function(error) {
	      console.error("Authentication failed:", error);
	    });

    }

    $scope.adminLogin = function(){
	    $rootScope.authObj.$authWithPassword({
	      email: $scope.adminUser.email,
	      password: $scope.adminUser.password
	    }).then(function(authData) {
	      console.log("Logged in as:", authData.uid);
	      $rootScope.currentUser = authData;
	      $location.path('/home');
	    }).catch(function(error) {
	      console.error("Authentication failed:", error);
	    });
  	}
    
});