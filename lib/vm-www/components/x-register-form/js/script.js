Polymer({
	token: '',
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
			localStorage.setItem("username", this.username);
			localStorage.setItem("email", this.email);
			localStorage.setItem("password", this.password);
			this.$.createToken.go();
		}
	},
	handleResRegister: function (event, res) {
		if (res.response.status === 'success') {
			this.$.registerSuccess.toggle();
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
	},
	handleResCreateTok: function (event, res) {
		this.$.tokkenCreated.toggle();
	},
	tokenChanged: function (oldValue, newValue) {
		if (newValue != '') {
			this.$.checkToken.go();
		}
	},
	handleResCheckTok: function (event, res) {
		if (res.response) {
			this.username = localStorage.getItem("username");
			this.email = localStorage.getItem("email");
			this.password = localStorage.getItem("password");
			localStorage.removeItem("username");
			localStorage.removeItem("email");
			localStorage.removeItem("password");
			this.$.registerUser.go();
		} else {
			localStorage.removeItem("username");
			localStorage.removeItem("email");
			localStorage.removeItem("password");
		}
	},
	switchToLogIn: function () {
		this.token = '';
	}

});