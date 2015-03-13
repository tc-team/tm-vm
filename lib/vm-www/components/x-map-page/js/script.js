Polymer({
	attached: function() {
		this.router.templateInstance.model.selectedTab = 'tm';
	},
	
	executeDelete: function (e, d, s) {
	    this.$.deleteMarker.go();
    },

    handleResDelMark: function (event, res) {
		this.mapInfo.activeMarker.marker.setMap(null);
		console.log(res.response);
		this.mapInfo.activeMarker = null;
	}
});