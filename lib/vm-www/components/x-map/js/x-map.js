Polymer('x-map', {

	handleResGetMap: function (event, res) {
		this.marks = res.response;
	},

	handleResSaveMark: function (event, res) {
		this.marks.push({
			id: res.response.insertId,
            longitude: this.lng,
            latitude: this.lat,
            name: 'marker' + this.marks.length
        });
		console.log('Save')
	},

	xMapReady: function (event, detail, sender) {
		this.map.self = this;
		google.maps.event.addListener(this.map, 'click', this.mapClicked);
	},
	
	mapClicked: function(event) {
		if(this.self.map.InfoWindow) {
			this.self.map.InfoWindow.close();
			this.self.map.InfoWindow = null;
		} else {
	        this.self.lng = event.latLng.lng();
	        this.self.lat = event.latLng.lat();
	        this.self.name = 'marker' + this.self.marks.length;
	        this.self.$.saveMark.go();
        }
    }

});