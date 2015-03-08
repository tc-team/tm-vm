Polymer('x-map', {
	mapApiLoaded: function() {
		this.super();
		this.map.self = this;
		this.marks = [];
		
		google.maps.event.addListener(this.map, 'click', this.mapClicked);
		console.log(this.marks);
		google.maps.event.addListener(this.marks, 'dbclick', this.markerClicked);

	},

	mapClicked: function(event) {
		this.self.marks.push({
            longitude: event.latLng.lng(),
            latitude: event.latLng.lat(),
            name: 'marker' + this.self.marks.length
        });
        this.self.lng = event.latLng.lng();
        this.self.lat = event.latLng.lat();
        this.self.name = 'marker' + this.self.marks.length;
        this.self.$.saveMark.go();
	},

	handleResGetMap: function (event, res) {
		this.marks = res.response;
		console.log(this.marks);
	},
	handleResSaveMark: function (event, res) {
		console.log('Save')

	},

	markerClicked: function(event) {
		console.log("db event");

	}
});