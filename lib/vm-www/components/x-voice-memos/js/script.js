Polymer({
	handleMemoDialog: function (){
		this.$.recorderDialog.toggle();
		this.$.recorder.initRecorder();
	},
	stopRecorder: function () {
		this.$.recorder.destroyRecorder();
	}
});