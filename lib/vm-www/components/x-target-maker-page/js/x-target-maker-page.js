Polymer({
	attached: function() {
		this.router.templateInstance.model.selectedTab = 'tm';
	},

	someFunc: function() {
		console.log("someFunc");
	}
});