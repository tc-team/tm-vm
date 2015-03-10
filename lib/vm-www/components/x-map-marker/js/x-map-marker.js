(function () {
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
	        this.setupDragHandler();
	    },

		onDragEnd: function (e, details, sender) {
		    this.latitude = e.latLng.lat();
		    this.longitude = e.latLng.lng();
		    this.updateMarkerPosition();
		    console.log("Draged", this.latitude, this.longitude);
		},

		setupDragHandler: function () {
			if (this.draggable) {
		        this.dragHandler_ = google.maps.event.addListener(this.marker, 'dragend', this.onDragEnd);
	      	} else {
		        google.maps.event.removeListener(this.dragHandler_);
		        this.dragHandler_ = null;
		    }
		},

		updateMarkerPosition: function () {
			this.$.updateMarker.go();
		},

		handleResUpdateMark: function (event, res) {
			console.log('Succes', res.response);
		}

	});

}) ();