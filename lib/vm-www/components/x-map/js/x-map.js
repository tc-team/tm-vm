Polymer('x-map', {

	mapApiLoaded: function() {
		this.super();
		this.map.self = this;
		this.marks = [];
		
		google.maps.event.addListener(this.map, 'click', this.markerClicked);
	},

	markerClicked: function(event) {
		this.self.marks.push({
            longitude: event.latLng.lng(),
            latitude: event.latLng.lat(),
            name: 'marker' + this.self.marks.length
        });
	}

});