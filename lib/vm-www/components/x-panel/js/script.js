(function () {

	function getCookie(cname) {
	    var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
	        var c = ca[i];
	        while (c.charAt(0)==' ') c = c.substring(1);
	        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	    }
	    return "";
	}

	Polymer ('x-panel',{
		ready: function() {
			this.hiddenNav = true;
			this.username = getCookie('username');
		},
		buttonClick: function (e) {
			if(!this.sessionState) {
				this.shadowRoot.querySelector('#toast').show();
				//return;
			} else {
				if(!this.hiddenNav) {
					this.$.coreToolbar.removeAttribute('class');
					this.shadowRoot.querySelector('#navPanel').style.visibility = 'hidden';
					this.hiddenNav = true;
				} else {
					this.$.coreToolbar.setAttribute('class', 'medium-tall');
					var navpanel = this.shadowRoot.querySelector('#navPanel');
					var temp = document.querySelector('#template');
					setTimeout(function () {
						navpanel.style.visibility = 'visible';
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
			this.activeTab = null;
		},
		sessionStateChanged: function(oldVal, newVal) {
			this.username = getCookie('username');
		}
	});

})();