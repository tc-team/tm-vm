Polymer({
  	openProfile: function() {
  		window.location.hash='/profile';
	},
	showLogOutDialog: function() {
		this.$.logOut.toggle();
	},
	executeLogOut: function() {
		this.$.ajaxDelSess.go();
	},
	handleResponseDell: function (event, res) {
		if (res.response.status === 'success') {
			this.logged = false;
		} 
	}
});