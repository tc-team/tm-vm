Polymer({

	attached: function() {
		this.router.templateInstance.model.selectedTab = 'tm';
	},

	domReady: function() {
		// this.mapInfo = {};
		// this.mapInfo.activeMarker = false;
	},

	executeDelete: function (e, d, s) {
		this.$.deleteMarker.go();
	},

	handleResDelMark: function (event, res) {
		this.mapInfo.activeMarker.marker.setMap(null);
		console.log(res.response);
		this.mapInfo.activeMarker = null;
	},

	toggle: function() {
		this.$.collapse.toggle();
	},

	goToHome: function() {
		this.mapInfo.setCenter({lat: this.local.coords.latitude,
								lng: this.local.coords.longitude});
	},

	getLocalPos: function(event, details, sender) {
		this.local = details.position;
	},

	mapReady: function() {
		if(this.mapInfo.activeMarker) {
			this.$.collapse.toggle();
		}
	}
});
