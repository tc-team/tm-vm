Polymer({
	sendRequest: function(event, detail, sender) {
		if (!this.username) {
			this.$.uinput.focus();
			return;
		} else if (!this.password) {
			this.$.pinput.focus();
			return;
		} else if (!this.confirmPassword) {
			this.$.pcinput.focus();
			return;
		} else if (!this.email) {
			this.$.einput.focus();
			return;
		} else {
			this.$.ajax.go();
			return;
		}
	},
	handleResponse: function (event, res) {
		if (res.response.status === 'success') {
			window.location.reload();
		} else if (res.response.status === 'error') {
			this.isHidden = false;
		};
	},
	handleConfirm: function () {
		if (this.password != this.confirmPassword) {
			this.$.confirm.isInvalid = true;
		} else if (this.password === this.confirmPassword) {
			this.$.confirm.isInvalid = false;
		}
	},
	keypressHandler: function (event, detail, sender){
		if (event.charCode === 13) this.sendRequest();
	}
});