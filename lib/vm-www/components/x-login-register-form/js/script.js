Polymer({
	select: 0,
	token: '',
	tokenChanged: function (oldValue, newValue) {
		if (newValue != '') {
			this.select = 1;
		} else {
			this.select = 0;
		}
	}
});