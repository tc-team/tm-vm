	Polymer('x-map-marker', {
		mapReady: function() {
			this.super();
			
			var deleteBtn = this.querySelector("#deleteButton");
			google.maps.event.addDomListener(deleteBtn, 'click', this.executeDelete.bind(this));
	       	google.maps.event.addDomListener(this.marker, 'dragend', this.updateMarkerPosition.bind(this));
	       	this.isActive = false;

	       	google.maps.event.addDomListener(this.marker, 'click', function (event, details, sender) {
	       		if (this.info) {
	       			this.map.activeMarker = this.info;
	       		} else {
	       			this.map.activeMarker = null;
	       		}
	       	}.bind(this));
			this.info.content = this.querySelector("#info_window");
	    },

	    executeDelete: function (e, d, s) {
	    	this.$.deleteMarker.go();
	    },

		updateMarkerPosition: function (event, details, sender) {
			this.$.updateMarker.go();
		},

		handleResUpdateMark: function (event, res) {
			console.log(res.response);
		},

		handleResDelMark: function (event, res) {
			this.marker.setMap(null);
			console.log(res.response);
		}
	});