Polymer({	
	ready: function () {
		this.$.ajax.go();
		this.reloadList = false;
	},
	reloadListChanged: function(oldVal, newVal) {
		if (newVal) {
			this.$.ajax.go();
			this.reloadList = false;
		}
	}
});