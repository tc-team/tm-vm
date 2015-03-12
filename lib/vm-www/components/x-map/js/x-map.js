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
		google.maps.event.addListener(this.map, 'click', this.mapClicked.bind(this));
		this.mapInfo = this.map;
	},
	
	mapClicked: function(event) {
		if(this.map.activeMarker) {
			this.map.activeMarker.close();
			this.map.activeMarker = null;
		} else {
	        this.lng = event.latLng.lng();
	        this.lat = event.latLng.lat();
	        this.name = 'marker' + this.marks.length;
	        this.$.saveMark.go();
        }
    }

});