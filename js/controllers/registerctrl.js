demo.controller('RegisterCtrl', function($scope, $rootScope, $firebase, $firebaseAuth, $location) {
    console.log("Register Control");

    var ref = new Firebase("https://glowing-heat-2588.firebaseio.com");
    $scope.authObj = $firebaseAuth(ref);

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
	      	$location.path('/home');
	    }).catch(function(error) {
	      		console.error("Error: ", error);
	    });
  	};	
});