Polymer({
	attached: function() {
		this.router.templateInstance.model.selectedTab = 'tm';
	},

	onDragEndT: function (e) {
<<<<<<< HEAD
		    this.updateMarkerPosition();
=======
		console.log("mouseup");	
	    this.updateMarkerPosition();
>>>>>>> 3b993988e929e59a4625196c95b3e8fc5d0c9afd
	},

	updateMarkerPosition: function () {
		this.$.updateMarker.go();
	},

	handleResDelMark: function (event, res) {
		this.$.deleteMarker.go();
<<<<<<< HEAD
=======
	},

	click: function() {
		console.log("click");	
>>>>>>> 3b993988e929e59a4625196c95b3e8fc5d0c9afd
	}
});