Polymer('x-map', {
	handleResGetMap: function (event, res) {
		this.marks = res.response;
	},

	handleResSaveMark: function (event, res) {
		console.log('Save')
	},

	xMapReady: function (event, detail, sender) {
		this.map.self = this;
		google.maps.event.addListener(this.map, 'click', this.mapClicked);
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
    }
});