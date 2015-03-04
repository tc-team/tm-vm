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
	handleResGetProff: function (event, res) {
		this.user = res.response;
	},

	createToken: function () {
		this.$.createToken.go();	
	},
	handleResCreateTok: function (event, res) {
		this.$.collapsePassword.toggle();
	}
});