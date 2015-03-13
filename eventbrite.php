<?php
	
	$cityId = urlencode($_GET['cityId']);
	$latitudeId = urlencode($_GET['latitudeId']);
	$longitudeId = urlencode($_GET['longitudeId']);

	// $JSONobj = file_get_contents('https://www.eventbrite.com/json/event_search?app_key=JUYT3UGQP4K235L3WV&city='.$cityID.'&region=&country='.$regionId.'&date_created=This%20Week');
	
	$JSONobj = file_get_contents('https://www.eventbrite.com/json/event_search?app_key=JUYT3UGQP4K235L3WV&city='.$cityId.'&within=200&within_unit=m&latitude='.$latitudeId.'&longitude='.$longitudeId.'&date=This%20Month');

	
	echo $JSONobj;
?>
