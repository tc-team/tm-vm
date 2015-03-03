Polymer ('x-panel',{
	
	ready: function() {
		this.hiddenNav = true;
		this.activeTab = 0;
	},

	buttonClick: function (e) {
		if(!this.hiddenNav) {
			this.$.coreToolbar.removeAttribute('class');
			this.shadowRoot.querySelector('#navPanel').setAttribute('hidden', '');
			this.hiddenNav = true;
		} else {
			this.$.coreToolbar.setAttribute('class', 'medium-tall');
			var navpanel = this.shadowRoot.querySelector('#navPanel');
			var temp = document.querySelector('#template');
			setTimeout(function() {
				navpanel.removeAttribute('hidden');
			}, 100);

			this.hiddenNav = false;
		}
	},

	domReady: function () {
		var tabs = ['tm', 'vm'];
		var i = 0;
		var n = tabs.length;
		for(i;  i < n; i++) {
			if (tabs[i] === this.selectedTab) {
				this.activeTab = i;
			}
		}
	}
});