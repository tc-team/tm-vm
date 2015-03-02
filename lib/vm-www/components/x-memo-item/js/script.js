Polymer({	
	ready: function() {
		this.reloadList = false;
	},
	deleteMemo: function () {
		this.$.deleteDialog.toggle();	
	},
	executeDelete: function () {
		this.$.ajaxDelMemo.go();
	},
	handleResponseDell: function () {
		this.reloadList = true;
	},
	editMemo: function () {
		this.$.editDialog.toggle();	
	},
	executeEdit: function () {
		this.$.ajaxEditMemo.go();
	},
	handleResponseEdit: function () {
		this.reloadList = true;
	}

});