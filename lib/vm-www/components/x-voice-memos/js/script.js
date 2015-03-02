Polymer({
	handleMemoDialog: function (){
		this.$.recorderDialog.toggle();
		this.$.recorder.initRecorder();
	},
	reloadList: function() {
		var list = this.parentNode.parentNode.children;
		for (var i = 0; i < list.length; i++) {
			if (list[i].nodeName == 'X-MEMOS-LIST')	{
				list[i].$.ajax.go();
			}
		}
	},
	stopRecorder: function () {
		this.$.recorder.destroyRecorder();
	}
});