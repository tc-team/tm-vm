Polymer({
	created: function () {
		this.delMarkerID = null;
	},

	attached: function() {
		this.router.templateInstance.model.selectedTab = 'tm';
	},

	someFunc: function() {
		console.log("someFunc");
		console.log(this);
	},

	deleteMarker: function (event, detail, sender) {
		this.delMarkerID = id;
		this.$.deleteMarker.go();
	},
	handleResDelMarker: function (event, res) {
		var i = 0;
		var markers = this.marks;
		var n = markers.length;
		for (i; i < n; i++) {
			if (markers[i].id === this.delMarkerID) {
				markers.splice(i, 1);
				return;
			}
		}
	},

	openCard: function(event, detail, sender) {
		console.log("twst");

	}
});