Polymer({	
	ready: function () {
		this.$.ajax.go();
	},
	reloadListChanged: function(oldVal, newVal) {
		if (newVal) {
			this.$.ajax.go();
		}
	}
});