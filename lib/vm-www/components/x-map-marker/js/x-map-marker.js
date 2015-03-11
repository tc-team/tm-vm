
	function deleteMarker_() {
		console.log('delete');
	}

	Polymer('x-map-marker', {
		mapReady: function() {
	        this._listeners = {};
	        this.marker = new google.maps.Marker({
	        	map: this.map,
	        	position: new google.maps.LatLng(this.latitude, this.longitude),
	        	title: this.title,
	        	draggable: this.draggable,
	        	visible: !this.hidden,
	        	icon: this.icon,
	        	zIndex: this.zIndex
	        });
	        this.contentChanged();
	        this.clickEventsChanged();
	        this.contentChanged();
	        this.mouseEventsChanged();
	        this.setupDragHandler_();
	       
	        
	    },
	    contentChanged: function() {
        	this.onMutation(this, this.contentChanged); // Watch for future updates.
        	
		    var htmlBox = document.createElement("div");
		    htmlBox.innerHTML = '<p>Latitude ' + this.latitude + '</p><p>Longitude ' + this.longitude + '</p>';
		    htmlBox.style.width = "250px";
		    htmlBox.style.height = "150px";

		    var deleteBtn = document.createElement("PAPER-BUTTON");
		    deleteBtn.innerText = "Delete";
		    deleteBtn.style.color ="black"
		    deleteBtn.raised = true;
		    htmlBox.appendChild(deleteBtn);

		    var self = this;
		    google.maps.event.addDomListener(deleteBtn, "click", function() {
		    	self.$.deleteMarker.go();
		    });

        	var content = htmlBox;
        	
        	if (content) {
          		if (!this.info) {
            		// Create a new InfoWindow
            		this.info = new google.maps.InfoWindow();
            		this.infoHandler_ = google.maps.event.addListener(this.marker, 'click', function() {
              			this.info.open(this.map, this.marker);
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

		onDragEnd_: function (e) {
		    this.latitude = e.latLng.lat();
		    this.longitude = e.latLng.lng();
		    this.updateMarkerPosition();
		},

		setupDragHandler_: function () {
			if (this.draggable) {
		        this.dragHandler_ = google.maps.event.addListener(this.marker, 'dragend', this.onDragEnd_.bind(this));
	      	} else {
		        google.maps.event.removeListener(this.dragHandler_);
		        this.dragHandler_ = null;
		    }
		},

		updateMarkerPosition: function () {
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