Polymer({
  showProfile: function() {
		this.$.ajaxProfile.go();
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
			window.location.hash='/login';
		} 
	},
	handleResProffile: function () {		
		this.$.profile.toggle();
	}
});