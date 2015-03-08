demo.controller('DetailCtrl', [
	"$scope",
	"$log",
	"$rootScope",
	"$firebase",
	"$firebaseAuth",
	"$routeParams",
	"$http",
	function ($scope, $log, $rootScope, $firebase, $firebaseAuth, $routeParams, $http){

		

          $scope.dynamicPopover = 'Hello, World!';
          $scope.dynamicPopoverTitle = 'Title';

		  $scope.mytime = new Date();

		  $scope.hstep = 1;
		  $scope.mstep = 15;

		  $scope.options = {
		    hstep: [1, 2, 3],
		    mstep: [1, 5, 10, 15, 25, 30]
		  	};

		  $scope.ismeridian = true;

		  $scope.toggleMode = function() {
		    $scope.ismeridian = ! $scope.ismeridian;
		  	};

		  $scope.update = function() {
		    var d = new Date();
		    d.setHours( 14 );
		    d.setMinutes( 0 );
		    $scope.mytime = d;
		  	};

		  $scope.changed = function () {
		    $log.log('Time changed to: ' + $scope.mytime);
		  	}; 	

		  $scope.changed = function () {
    		$log.log('Time changed to: ' + $scope.mytime);
  			};


		$scope.myInterval = 5000;
		$scope.slides = [{image: './img/1.jpg', text: 'Welcome to AirChat!'},
						{image: './img/2.jpg', text: 'Welcome to AirChat!'},
						{image: './img/3.jpg', text: 'Welcome to AirChat!'}
		];

		$scope.isCollapsed = true;

		var ref = new Firebase("https://glowing-heat-2588.firebaseio.com");
    	$rootScope.authObj = $firebaseAuth(ref);
		$rootScope.authObj.$onAuth(function(authData) {
			if (authData) {
				$rootScope.currentUser = authData;
				console.log("!!!!!!!!!!!!!!!!!!!Logged in as: ", $rootScope.currentUser);
			} else {
				console.log("Logged out");
			}
		});
		// $routeParam.flightId;
		//console.log("NEW ONE");
		var url = "airline.php?"+"airlineId="+$routeParams.airline+"&flightId="+$routeParams.flight+"&yearId="+$routeParams.year+"&monthId="+$routeParams.month+"&dayId="+$routeParams.day;

		$http.get(url).
		  success(function(data, status, headers, config) {
		    // console.log("our data: ", data);
		    // console.log("status: ", status);
		    $rootScope.dude = data;

		    $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+$rootScope.dude.appendix.airports[0].city+'%2C%20'+$rootScope.dude.appendix.airports[0].stateCode+'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
			.then(function(response){
		    	$scope.weatherDepart = response.data
		    	//console.log(response)
		    });

		    $http.get('https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+$rootScope.dude.appendix.airports[1].city+'%2C%20'+$rootScope.dude.appendix.airports[1].stateCode+'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys')
			.then(function(response){
		    	$scope.weatherArrive = response.data
		    	//console.log(response)
		    });

			console.log('FLIGHT INFO: ', $rootScope.dude.appendix.airports[1]);

			var eventURL = "eventbrite.php?"+"cityId="+$rootScope.dude.appendix.airports[1].city+"&countryCode="+$rootScope.dude.appendix.airports[1].countryCode;

		    $http.get(eventURL)
			.then(function(response){
		    	$scope.eventbrite = response.data
		    	console.log("!!!!!!!!EVENTS!!!!!!!!!!!!", $scope.eventbrite);
		    	
		    });


		    // console.log("One param : ", $routeParams.airline);
		    // console.log("URL to get data: ", url);
		    // console.log("Getting Data from airline: ", $rootScope.dude);
		    
		  }).
		  error(function(data, status, headers, config) {
		    
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		    console.log("sorry");
		  });

		var flightRef = new Firebase('https://glowing-heat-2588.firebaseio.com/flights/'+$routeParams.flightId);
		$scope.flight = $firebase(flightRef).$asArray();
		var url = 'https://glowing-heat-2588.firebaseio.com/flights/'+$routeParams.flightId+'/comments/';
		var commentRef = new Firebase(url);
		$scope.comments = $firebase(commentRef).$asArray();

		$scope.createComment = function(){
			$scope.newComment.user = $rootScope.currentUser.facebook.cachedUserProfile.name;
			$scope.newComment.userId = $rootScope.currentUser.facebook.cachedUserProfile.id;
			$scope.comments.$add($scope.newComment).then(function()
				{$scope.newComment = {};
			});
			console.info('New Comment Added!');
			console.log("!!!!!!!HERE!!!!!!!!!!!! " , $rootScope.currentUser.facebook.cachedUserProfile.id);
		}

		$scope.deleteComment = function(commentId){
			var commentRef = new Firebase(url+'/'+commentId);
			commentRef.remove();
		}
	} 
]);