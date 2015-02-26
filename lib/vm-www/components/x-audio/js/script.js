Polymer({
	ready: function () {
		if (!!this.src) this.init();
	},
	init: function () {
		var self = this;
		self.length = 0;
		self.volume = 8;
		self.duration = '00:00:00';
		self.time = '00:00:00';
		self.myaudio = new Audio(this.src);
		self.myaudio.volume = self.volume / 10;
		self.myaudio.addEventListener('timeupdate', function (){
			self.value = parseInt(this.currentTime, 10);
			self.length = this.duration;
		 	self.time = self.toHHMMSS(this.currentTime);
			self.duration = self.toHHMMSS(this.duration);
		});
	},
	srcChanged: function () {
		this.init();
	},
	play: function () {
		if (!this.src) return;
		if (this.$.playButton.icon === 'av:play-arrow') {
			this.myaudio.play();
			this.$.playButton.icon = 'av:pause';
		} else {
			this.$.playButton.icon = 'av:play-arrow';
			this.myaudio.pause();
		}
	},
	changeSlider: function (event) {
		this.myaudio.currentTime = event.target.immediateValue_;
	},
	changeVolume: function (event) {
		this.volume = event.target.immediateValue_;
		var volume = (event.target.immediateValue_) / 10;
		this.myaudio.volume = volume;
	},
	mouseOver: function () {
		if (this.myaudio.volume === 0) {
			this.$.mute.icon = "av:volume-up";
		} else {
			this.$.mute.icon = "av:volume-off";
		}
	},
	mouseOut: function () {
		if (this.myaudio.volume != 0) {
			this.$.mute.icon = "av:volume-up";
		} else {
			this.$.mute.icon = "av:volume-off";	
		}
	},
	mute: function () {
		if (this.myaudio.volume != 0) {
			this.$.mute.icon = "av:volume-off";
			this.myaudio.volume = 0;
			this.$.volumeSlider.disabled = true;
		} else {
			this.myaudio.volume = this.volume / 10;
			this.$.volumeSlider.disabled = false;
		}
	},
	toHHMMSS: function (value) {
	    var sec_num = parseInt(value, 10);
	    var hours   = Math.floor(sec_num / 3600);
	    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
	    var seconds = sec_num - (hours * 3600) - (minutes * 60);

	    if (hours   < 10) {hours   = "0"+hours;}
	    if (minutes < 10) {minutes = "0"+minutes;}
	    if (seconds < 10) {seconds = "0"+seconds;}
	    var time    = hours+':'+minutes+':'+seconds;
	    return time;
	}

});	