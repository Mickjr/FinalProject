demo.controller('HomeCtrl',[
	"$scope",
	"$firebase",
	"$http",
	"$rootScope",
	"$location",
	function ($scope, $firebase, $http, $rootScope, $location){
		
		$scope.myInterval = 5000;
		$scope.slides = [{image: './img/1.jpg', text: 'Welcome to AirChat!'},
						{image: './img/2.jpg', text: 'Welcome to AirChat!'},
						{image: './img/3.jpg', text: 'Welcome to AirChat!'}
		];

		$scope.printAir = function (){
			$scope.mySearch = {
				year : $scope.dt.getFullYear().toString(),
				month : ($scope.dt.getMonth()+1).toString(),
				day : $scope.dt.getDate().toString(),
				airline : $scope.myAirline.iata,
				flight : $scope.myFlight
			}

			//console.log("NEW ONE");
			var url = "airline.php?"+"airlineId="+$scope.mySearch.airline+"&flightId="+$scope.mySearch.flight+"&yearId="+$scope.mySearch.year+"&monthId="+$scope.mySearch.month+"&dayId="+$scope.mySearch.day;
			console.log(url);
			$http.get(url).
			  success(function(data, status, headers, config) {
			    console.log("our data: ", data);
			    console.log("status: ", status);
			    $rootScope.dude = data;
			    console.log($rootScope.dude);
			    $location.path('/detail/'+$rootScope.dude.flightStatuses[0].flightId);
			  }).
			  error(function(data, status, headers, config) {
			    
			    // called asynchronously if an error occurs
			    // or server returns response with an error status.
			    console.log("sorry");
			  });

			//console.log($scope.mySearch);
		}

		$http.get('airline.json').then(function(response){
	      $scope.airlines = response.data.airlines
	    });

	    // in input is not equal to a 
	    //value in $scope.airlines error out


	    // if $scope.myAirline is undefined or null
	    // please enter a airline.


	  $scope.today = function() {
	    $scope.dt = new Date();
	  };
	  $scope.today();


	  $scope.clear = function () {
	    $scope.dt = null;
	  };

	  $scope.open = function($event) {
	    $event.preventDefault();
	    $event.stopPropagation();

	    $scope.opened = true;
	  };

	  $scope.dateOptions = {
	    formatYear: 'yyyy',
	    formatMonth: 'MM',
	    startingDay: 1
	  };


	
	}
]);