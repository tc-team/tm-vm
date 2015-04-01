window.onload = function () {
	var map = document.querySelector('#map');
	if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(showPosition);
	} else { 
	    console.log("Geolocation is not supported by this browser.");
	}

	function showPosition (position) {
		var localLatitude = position.coords.latitude;
		var localLongitude = position.coords.longitude;

		var slippy_map = new SlippyMap(map, {
			latitude: localLatitude,
			longitude: localLongitude,
			zoom: 4,
			mapType: 'satellite',
			worker: 'js/slippy-map-worker.js'
		});
	}
}