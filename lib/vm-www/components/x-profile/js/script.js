Polymer({
	toggleEmail: function () {
		this.$.toggleEmail.toggle();
	},
	changeEmail: function () {
		
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
	handleResProffile: function (event, res) {
		this.user = res.response;
	}
});