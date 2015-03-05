Polymer({
	created: function () {
		this.newEmail = '';
		this.token = null;
		this.isAllowedChangePass = false;
		this.memoCount = 0;
	},
	toggleEmail: function () {
		this.$.collapseEmail.toggle();
	},
	changeEmail: function () {
		if (this.newEmail === '' && this.$.email.validity.valid) {
			return;
		}
		this.$.setEmail.go();
	},
	handleResSetEmail: function (event, res) {
		this.user.email = this.newEmail;
		this.$.collapseEmail.toggle();
		this.$.changedEmailToast.show();
	},
	handleResGetProff: function (event, res) {
		this.user = res.response;
	},
	tokenChanged: function (oldValue, newValue) {
		this.$.checkToken.go();
	},
	handleResCheckTok: function (event, res) {
		if (res.response) {
			this.$.changePassButt.style.visibility = 'hidden';
			this.$.changePassword.style.display = 'block';
		}
	},
	createToken: function () {
		this.$.createToken.go();	
	},
	handleResCreateTok: function (event, res) {
		this.$.sendMailToast.show();
	},
	handleConfirm: function () {
		if (this.password != this.confirmPassword) {
			this.querySelector('::shadow #confirm').isInvalid = true;
		} else if (this.password === this.confirmPassword) {
			this.querySelector('::shadow #confirm').isInvalid = false;
		}
	},
	cancelPassChange: function () {
		window.location.hash = '/profile';
		this.$.changePassButt.style.visibility = 'visible';
		this.$.changePassword.style.display = 'none';
	},
	saveNewPass: function () {
		if (this.querySelector('::shadow #confirm').isInvalid && this.password !== '') {
			return;
		}
		this.$.setPass.go();
	},
	handleResSetPass: function (event, res) {
		this.$.savePassToast.show();
		window.location.hash = '/profile';
		this.$.changePassButt.style.visibility = 'visible';
		this.$.changePassword.style.display = 'none';
	},
	deleteAccount: function () {
		this.$.delDialog.toggle();
	},
	executeDelete: function () {
		this.$.deleteUser.go();
	},
	handleResDelUser: function (event, res) {
		this.logged = false;
	},
	handleResGetMemo: function (event, res) {
		this.memoNumber = res.response.number;
	},
	togglePayment: function () {
		this.$.collapsePayment.toggle();
	},
	createPayment: function () {
		if (this.memoCount != 0) {
			this.$.createPaymentAjax.go();
		}
	},
	handleResCreatePay: function (event, res) {
		window.location.href = res.response;
	}
});