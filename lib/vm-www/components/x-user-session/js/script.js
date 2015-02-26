Polymer({
	ready: function () {
		this.sessionState = false;
	},
	handleResponse: function (event, res) {		
		if (res.response) {
			this.sessionState = true;
		} else {
			this.sessionState = false;
		};
	}
});