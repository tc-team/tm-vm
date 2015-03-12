	Polymer('x-map-marker', {
		domReady: function () {
			this.super();
			this.info_content =	this.querySelector("#info_window");
		},

		mapReady: function() {
<<<<<<< HEAD
			this.super();
			var deleteBtn = this.querySelector("#deleteButton");
			google.maps.event.addDomListener(deleteBtn, 'click', this.executeDelete.bind(this));
	       	google.maps.event.addDomListener(this.marker, 'dragend', this.updateMarkerPosition.bind(this));
	    },
	    executeDelete: function (e, d, s) {
	    	this.$.deleteMarker.go();
	    },
	    contentChanged: function() {
        	this.onMutation(this, this.contentChanged); // Watch for future updates.
  		
        	var content = this.info_content;
=======
	        this.super();
	        this.marker.setZIndex(this.zIndex);
	        this.map.InfoWindow = null;	
	    },
	    contentChanged: function() {
        	this.onMutation(this, this.contentChanged); // Watch for future updates.
        	

			// <style>
			// 	.paragr {
			// 		width = 250px;
			// 		height = 150px;
			// 	}

			// 	paper-button {
			// 		color = black;
			// 	}

			// 	.visible {
			// 		display: none;
			// 	}
			// </style>

			// <div class="infoWindowContent" id="infoWinCont">
			// 	<p class="paragr">Latitude: {{this.latitude}}</p>
			// 	<p class="paragr">Longitude: {{this.longitude}}</p>
			// 	<paper-button raised on-click="">Delete</paper-button>
			// </div>

			// document.getElementById("???").onclick = toggleInfWin;
			// function toggleInfWin() {
			// 	document.getElementById("infoWinCont").classList.toggle("visible");
			// }

			// onclick="changeclass()";
			// function changeclass() {
			// 	document.getElementById("myElement").className="newClass"
			// }


		    var self = this;
		    google.maps.event.addDomListener(deleteBtn, "click", function() {
		    	self.$.deleteMarker.go();
		    });

        	var content = htmlBox;
>>>>>>> 3b993988e929e59a4625196c95b3e8fc5d0c9afd
        	
        	if (content) {
          		if (!this.markerInfoWinow) { 		// rename info to markerInfoWinow
            		// Create a new InfoWindow
            		this.markerInfoWinow = new google.maps.InfoWindow();
            		this.infoHandler_ = google.maps.event.addListener(this.marker, 'click', function() {
              			// Validate open only one InfoWindow at a time
              			if(this.map.InfoWindow === null) {
              				this.markerInfoWinow.open(this.map, this.marker);
              				this.map.InfoWindow = this.info;
              			} else {
              				this.map.InfoWindow.close();
              				this.markerInfoWinow.open(this.map, this.marker);
              				this.map.InfoWindow = this.markerInfoWinow;
              			}


              			this.fire('openCard', {msg: 'this.info'});


            		}.bind(this));
      			}
          		
          		this.markerInfoWinow.setContent(content);

        	} else {
          		if (this.markerInfoWinow) {
            		// Destroy the existing infowindow.  It doesn't make sense to have an empty one.
            		google.maps.event.removeListener(this.infoHandler_);
            		this.markerInfoWinow = null;
          		}
        	}
<<<<<<< HEAD
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
=======
      	}
  //     	,

		// updateMarkerPosition: function () {
		// 	this.$.updateMarker.go();
		// },

		// handleResUpdateMark: function (event, res) {
		// 	console.log(res.response);
		// },

		// handleResDelMark: function (event, res) {
		// 	this.marker.setMap(null);
		// 	console.log(res.response);
		// }
>>>>>>> 3b993988e929e59a4625196c95b3e8fc5d0c9afd

	});