Polymer({
	executeDelete: function() {
		this.$.ajaxDelSess.go();
	},
	handleResponseDell: function (event, res) {
		if (res.response.status === 'success') {
			this.logged = false;
			window.location.hash='/login';
		} 
	}
});