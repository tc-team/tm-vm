Polymer({
  	showProfile: function() {
  		window.location.hash='/target-maker';
  		// this.$.ajaxProfile.go();
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
	}/*,
	handleResProffile: function (event, res) {
		this.user = res.response;
		this.$.profile.toggle();
	}*/
});