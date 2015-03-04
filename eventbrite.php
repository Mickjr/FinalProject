<?php

	$airlineId = urlencode($_GET['airlineId']);
	$flightId = urlencode($_GET['flightId']);
	$yearId = urlencode($_GET['yearId']);
	$monthId = urlencode($_GET['monthId']);
	$dayId = urlencode($_GET['dayId']);

	$JSONobj = file_get_contents('https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/'.$airlineId.'/'.$flightId.'/dep/'.$yearId.'/'.$monthId.'/'.$dayId.'?&appId=9147c5c6&appKey=8c3299af6667cf363fa580203efd4a8d&utc=true');
	echo $JSONobj;
?>