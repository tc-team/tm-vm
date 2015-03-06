Polymer({	
	ready: function() {
	    this.isHidden = true;
	},
	sendRequest: function(event, detail, sender) {
		if (!this.username) {
			this.$.uinput.focus();
			return;
		} else if (!this.password) {
			this.$.pinput.focus();
			return;
		} else {
			this.$.ajax.go();
			return;
		}
	},
	handleResponse: function (event, res) {
		if (res.response.status === 'success') {
			this.islogged = true;
		} else if (res.response.status === 'error') {
			this.isHidden = false;
			var self = this;
			setTimeout(function(){
				self.isHidden = true;
			}, 5000);
		};
	},
	keypressHandler: function (event, detail, sender){
		if (event.charCode === 13) this.sendRequest();
	}
});