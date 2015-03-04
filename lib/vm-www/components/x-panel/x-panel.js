Polymer ('x-panel',{
	
	ready: function() {
		this.hiddenNav = true;
	},

	buttonClick: function (e) {
		if(!this.sessionState) {
			this.shadowRoot.querySelector('#toast').show();
			//return;
		} else {
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
		}
	},
	selectedTabChanged: function(oldVal, newVal) {
		var tabs = ['tm', 'vm'];
		var i = 0;
		var n = tabs.length;
		for(i;  i < n; i++) {
			if (tabs[i] === newVal) {
				this.activeTab = i;
				return;
			}
		}
	}
});