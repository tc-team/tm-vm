Polymer({
	created: function () {
		this.disabled = false;
		if (!!this.src) this.init(this.src);
	},
	init: function (src) {
		var self = this;
		self.length = 0;
		self.volume = 8;
		self.remainder = '00:00:00';
		self.audio = new Audio(src);
		self.audio.volume = self.volume / 10;
		self.audio.addEventListener('ended', function () {
			self.value = self.length;
			self.$.playButton.icon = 'av:play-arrow';
		});
		self.audio.addEventListener('timeupdate', function (){
			self.value = parseInt(this.currentTime, 10);
			self.duration = this.duration;
			self.remainder = self.toHHMMSS(this.duration - this.currentTime);
		});
	},
	srcChanged: function (oldValue, newValue) {
		this.init(newValue);
	},
	play: function () {
		if (!this.src && !this.disabled) return;
		if (this.$.playButton.icon === 'av:play-arrow') {
			this.audio.play();
			this.$.playButton.icon = 'av:pause';

		} else {
			this.$.playButton.icon = 'av:play-arrow';
			this.audio.pause();
		}
	},
	changeCurrentTime: function (event) {
		if (!this.src && !this.disabled) return;
		this.audio.currentTime = event.target.immediateValue_;
	},
	changeVolume: function (event) {
		if (!this.src && !this.disabled) return;
		this.volume = event.target.immediateValue_;
		var volume = (event.target.immediateValue_) / 10;
		this.audio.volume = volume;
	},
	mouseOver: function () {
		if (!this.src && !this.disabled) return;
		if (this.audio.volume === 0) {
			this.$.mute.icon = "av:volume-up";
		} else {
			this.$.mute.icon = "av:volume-off";
		}
	},
	mouseOut: function () {
		if (!this.src && !this.disabled) return;
		if (this.audio.volume != 0) {
			this.$.mute.icon = "av:volume-up";
		} else {
			this.$.mute.icon = "av:volume-off";	
		}
	},
	mute: function () {
		if (!this.src && !this.disabled) return;
		if (this.audio.volume != 0) {
			this.$.mute.icon = "av:volume-off";
			this.audio.volume = 0;
			this.$.volume_slider.disabled = true;
		} else {
			this.audio.volume = this.volume / 10;
			this.$.volume_slider.disabled = false;
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
	},
	disabledChanged: function (oldValue, newValue) {
		if (newValue === true) {
			this.init();
			this.$.volume_slider.disabled = true;
			this.$.audio_slider.disabled = true;
			this.$.playButton.setAttribute('class', 'disabled');
			this.$.mute.setAttribute('class', 'disabled');
			this.$.name.setAttribute('class', 'disabled');
			this.$.remainder.setAttribute('class', 'disabled');

		} else if (newValue === false) {
			this.init(this.src);
			this.$.volume_slider.disabled = false;
			this.$.audio_slider.disabled = false;
			this.$.playButton.removeAttribute('class');
			this.$.mute.removeAttribute('class');
			this.$.name.removeAttribute('class');
			this.$.remainder.removeAttribute('class');

		}
	}
});	