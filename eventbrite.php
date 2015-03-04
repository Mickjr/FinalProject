<?php
	
	$cityId = urlencode($_GET['cityId']);
	// $regionId = urlencode($_GET['regionId']);
	$countryId = urlencode($_GET['countryId']);

	$JSONobj = file_get_contents('https://www.eventbrite.com/json/event_search?app_key=JUYT3UGQP4K235L3WV&city='.$cityID.'&region=&country='.$regionId.'&date_created=This%20Week');
	echo $JSONobj;
?>
