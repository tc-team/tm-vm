Polymer({
	ready: function () {
		this.sessionState = false;
	},
	handleResponse: function (event, res) {		
		if (res.response) {
			this.sessionState = true;
		} else {
			this.sessionState = false;
			var hash = window.location.hash;
			var res = hash.match(/login\/.*/gi);
			if (res === null) {
				window.location.hash = '/login';
			}
		};
	}
});