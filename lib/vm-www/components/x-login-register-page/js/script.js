Polymer({
	sessionStateChanged: function(oldValue, newValue) {
		this.router.templateInstance.model.isSession = newValue;
		if (newValue) {
			window.location.href='/#/';	
		}
	}
});