Polymer({
    created: function () {
        this.recTime = '00:00:00';
        this.count = 0;    
        this.recorder = null;
        this.WAV = null;
        this.recording =  false;
        this.isHidden = true;
    },
    initRecorder: function (){
        var worker_path = this.resolvePath('js/voice-recorder-worker.js');
        var config = {
            bufferLen: 4096,
            numChannels: 1,
            worker: worker_path
        }
        this.recorder = new VoiceRecorder(config);
    },
    destroyRecorder: function () {
        this.deleteRecord();
        this.recorder.destroy();
        delete this.recorder;
    },
    startRecord: function () {
        var self = this;
        if (!this.recording) {
            this.recorder.record();
            this.$.startRecord.setAttribute('class', 'recordActive');
            this.recording = true;
            self.timer = setInterval(function () {
                self.count++;
                self.recTime = self.toHHMMSS(self.count);
            }, 1000);
        } else {
            this.recorder.stop();
            this.$.recAudio.setAttribute('disabled', false);
            this.recorder.exportWAV(function(blob) {
                self.WAV = blob;
                var url = window.URL.createObjectURL(self.WAV);
                self.audioRecUrl = url;
            });
            this.$.startRecord.removeAttribute('class');
            this.recording = false;
            clearInterval(this.timer);
        }
    },
    deleteRecord: function () {
        if (this.recording) {
            this.$.startRecord.removeAttribute('class');
            this.recorder.stop();
            this.recording = false;
        }
        clearInterval(this.timer);
        this.recTime = '00:00:00';
        this.count = 0;    
        this.WAV = null;
        if (this.recorder != null) {
            this.recorder.clear();
        }
        window.URL.revokeObjectURL(this.audioRecUrl);
        this.$.recAudio.setAttribute('disabled', true);
    },
    saveRecord: function () {
        if (this.recording) {
            this.$.startRecord.removeAttribute('class');
            this.recorder.stop();
            this.recording = false;
            clearInterval(this.timer);
        }
        var self = this;        
        self.recorder.exportWAV(function(blob) {
            self.WAV = blob;
            var url = window.URL.createObjectURL(self.WAV);
            self.audioRecUrl = url;
            self.recorder.clear();
            var formData = new FormData();
            var id = Date.now();
            formData.append('id', id);
            var today = new Date();
            var time = today.toLocaleString()
            var name = self.memoName || time;
            formData.append('name', name);
            formData.append(id, self.WAV);
            self.$.ajax.body = formData;
            self.$.ajax.go();
        });
    },
    handleResponse: function (event, res) {
        if (res.response === 'success') {
            this.reload = true;
        } else if (res.response === 'space-error') {
            this.isHidden = false;
        };
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