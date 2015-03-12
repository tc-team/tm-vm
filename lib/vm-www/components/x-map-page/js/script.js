Polymer({
	attached: function() {
		this.router.templateInstance.model.selectedTab = 'tm';
	},

	onDragEndT: function (e) {
		console.log("mouseup");	
	    this.updateMarkerPosition();
	},

	updateMarkerPosition: function () {
		this.$.updateMarker.go();
	},

	handleResDelMark: function (event, res) {
		this.$.deleteMarker.go();
	},

	click: function() {
		console.log("click");	
	}
});