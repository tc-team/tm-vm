	Polymer('x-map-marker', {
		mapReady: function() {
			this.super();
	       	google.maps.event.addDomListener(this.marker, 'dragend', this.updateMarkerPosition.bind(this));
	       	google.maps.event.addDomListener(this.marker, 'click', function (event, details, sender) {
	       		if (this.info) {
	       			this.map.activeMarker = this;
	       		} else {
	       			this.map.activeMarker = null;
	       		}
	       	}.bind(this));

	       	google.maps.event.addDomListener(this.info, 'closeclick', function (event, details, sender) {
       			this.map.activeMarker = null;
	       	}.bind(this));
	    },

		updateMarkerPosition: function (event, details, sender) {
			this.$.updateMarker.go();
		},

		handleResUpdateMark: function (event, res) {
			console.log(res.response);
		}
	});