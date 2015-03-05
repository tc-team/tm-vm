Polymer({
	attached: function() {
		this.router.templateInstance.model.selectedTab = '';
	},
	sessionStateChanged: function(oldValue, newValue) {
		this.router.templateInstance.model.isSession = newValue;
		if (!newValue) {
			window.location.hash='/login';
		}
	}
});