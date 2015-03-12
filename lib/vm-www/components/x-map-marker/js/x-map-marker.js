	Polymer('x-map-marker', {
		mapReady: function() {
			this.super();
			var deleteBtn = this.querySelector("#deleteButton");
			google.maps.event.addDomListener(deleteBtn, 'click', this.executeDelete.bind(this));
	       	google.maps.event.addDomListener(this.marker, 'dragend', this.updateMarkerPosition.bind(this));
	       	this.map.InfoWindow = null;
	    },
	    executeDelete: function (e, d, s) {
	    	this.$.deleteMarker.go();
	    },
	    contentChanged: function() {
        	this.onMutation(this, this.contentChanged); // Watch for future updates.

  			var info_content =	this.querySelector("#info_window");

        	var content = info_content;
	    	
        	if (content) {
          		if (!this.info) { 		// rename info to info
            		// Create a new InfoWindow
            		this.info = new google.maps.InfoWindow();
            		this.infoHandler_ = google.maps.event.addListener(this.marker, 'click', function() {
              			// Validate open only one InfoWindow at a time
              			if(this.map.InfoWindow === null) {
              				this.info.open(this.map, this.marker);
              				this.map.InfoWindow = this.info;
              			} else {
              				this.map.InfoWindow.close();
              				this.info.open(this.map, this.marker);
              				this.map.InfoWindow = this.info;
              			}

              			this.fire('openCard', {msg: 'this.info'});


            		}.bind(this));
      			}
          		
          		this.info.setContent(content);

        	} else {
          		if (this.info) {
            		// Destroy the existing infowindow.  It doesn't make sense to have an empty one.
            		google.maps.event.removeListener(this.infoHandler_);
            		this.info = null;
          		}
        	}
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