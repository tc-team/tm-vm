Polymer({	
	ready: function() {
		this.reloadList = false;
	},
	deleteMemo: function () {
		this.$.deleteDialog.toggle();	
	},
	executeDelete: function () {
		this.$.ajaxDeleteMemo.go();
	},
	handleResDelete: function () {
		this.reloadList = true;
	},
	editMemo: function () {
		this.$.editDialog.toggle();	
	},
	executeEdit: function () {
		this.$.ajaxEditMemo.go();
	},
	handleResEdit: function () {
		this.reloadList = true;
	}
});