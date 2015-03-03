Polymer ('x-panel',{
	
	ready: function() {
		this.hiddenNav = true;
	},

	buttonClick: function (e) {
		if(!this.hiddenNav) {
			this.$.coreToolbar.removeAttribute('class');
			this.$.navPanel.setAttribute('hidden', '');
			this.hiddenNav = true;
		} else {
			this.$.coreToolbar.setAttribute('class', 'medium-tall');
			 var navpanel = this.$.navPanel;
			 setTimeout(function() {
			 	navpanel.removeAttribute('hidden');
			 }, 100);
			this.hiddenNav = false;
		}
	}
});