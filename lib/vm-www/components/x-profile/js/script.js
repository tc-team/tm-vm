Polymer({
	created: function () {
		this.newEmail = '';
	},
	toggleEmail: function () {
		this.$.toggleEmail.toggle();
	},
	changeEmail: function () {
		if (this.newEmail === '') {
			return;
		}
		this.$.setEmail.go();
	},
	handleResSetEmail: function (event, res) {
		this.user.email = this.newEmail;
	},


	createToken: function () {
		this.$.createToken.go();	
	},
	handleResCreateTok: function (event, res) {
		this.$.collapsePassword.toggle();
	},

	


	toggleEmail: function () {
		this.$.collapse.toggle();
	},
	toggleEmail: function () {
		this.$.collapse.toggle();
	},
	executeDelete: function() {
		this.$.ajaxDelSess.go();
	},
	handleResponseDell: function (event, res) {
		if (res.response.status === 'success') {
			this.logged = false;
			window.location.hash='/login';
		} 
	},
	handleResGetProff: function (event, res) {
		this.user = res.response;
	}
});