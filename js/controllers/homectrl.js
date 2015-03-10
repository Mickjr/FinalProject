demo.controller('HomeCtrl',[
	"$scope",
	"$firebase",
	"$http",
	"$rootScope",
	"$location",
	function ($scope, $firebase, $http, $rootScope, $location){
		
		// $scope.dynamicPopover = 'Hello, World!';
  //       $scope.dynamicPopoverTitle = 'Title';

		$scope.myInterval = 5000;
		$scope.slides = [{image: './img/1.jpg', text: 'Welcome to AirChat!'},
						{image: './img/2.jpg', text: 'Welcome to AirChat!'},
						{image: './img/3.jpg', text: 'Welcome to AirChat!'}
		];

		$scope.printAir = function (){
			$rootScope.mySearch = {
				year : $scope.dt.getFullYear().toString(),
				month : ($scope.dt.getMonth()+1).toString(),
				day : $scope.dt.getDate().toString(),
				airline : $scope.myAirline.iata,
				flight : $scope.myFlight
			}

			$location.path('/detail/'+$rootScope.mySearch.year+'/'+$rootScope.mySearch.month+'/'+$rootScope.mySearch.day+'/'+$rootScope.mySearch.airline+'/'+$rootScope.mySearch.flight);

			
			// console.log($rootScope.mySearch);
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