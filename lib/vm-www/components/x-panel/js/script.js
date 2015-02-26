Polymer({
	handleResponse: function (event, res) {		
		if (res.response) {
			this.sessionState = true;
		} else {
			this.sessionState = false;
		};
	}
});