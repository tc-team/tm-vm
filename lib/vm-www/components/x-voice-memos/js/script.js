Polymer({
	handleCollapse: function (){
		if (this.$.addMemosButton.icon === "add") {
			this.$.addMemosButton.icon = "expand-less";
			this.$.recorder.init();
		} else {
			this.$.addMemosButton.icon = "add";	
			this.$.recorder.stopRecorder();
		}
		this.$.collapse.toggle();
	},
	reloadList: function() {
		var list = this.parentNode.parentNode.children;
		for (var i = 0; i < list.length; i++) {
			if (list[i].nodeName == 'X-MEMOS-LIST')	{
				list[i].$.ajax.go();
			}
		}
	}
});
