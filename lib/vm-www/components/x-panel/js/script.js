Polymer({
	ready: function () {
		this.activeTab = 0;
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