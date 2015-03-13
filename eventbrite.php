<?php
	
	$cityId = urlencode($_GET['cityId']);
	$regionId = urlencode($_GET['regionId']);
	$latitudeId = urlencode($_GET['latitudeId']);
	$longitudeId = urlencode($_GET['longitudeId']);

	// $JSONobj = file_get_contents('https://www.eventbrite.com/json/event_search?app_key=JUYT3UGQP4K235L3WV&city='.$cityID.'&region=&country='.$regionId.'&date_created=This%20Week');
	
	$JSONobj = file_get_contents('https://www.eventbrite.com/json/event_search?app_key=JUYT3UGQP4K235L3WV&city='.$cityId.'&region=&country='.$regionId.'&within=60&within_unit=m&latitude='.$latitudeId.'&longitude='.$longitudeId.'&date=This%20Month&sort_by=city');

	
	echo $JSONobj;
?>
