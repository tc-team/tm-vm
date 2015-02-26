Polymer({
  recorder : null,
  WAV : null,
  localMediaStream: null,
  recording: false,
  init: function (){
    var self = this;
    if (!navigator.getUserMedia)
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia || navigator.msGetUserMedia;

    if (navigator.getUserMedia) {
      navigator.getUserMedia({audio:true}, function (stream) {
        self.localMediaStream = stream;
        var AudioContext = window.AudioContext || window.webkitAudioContext;
        var context = new AudioContext();
        var microphone = context.createMediaStreamSource(stream);
        
        var WORKER_PATH = 'js/worker.js';
        var config = {
          bufferLen: 4096,
          numChannels: 1,
          worker: 'js/voice-memos/voice-recorder/voice-recorder-worker.js'
        }
        self.recorder = new VoiceRecorder(microphone, config);
      }, 
      function(e) {
        console.log('error');
      });
    } else {
      console.log('getUserMedia not supported in this browser.');
    }
  },
  startRecord: function () {
    if (!this.recording) {
      this.recorder.record();
      this.$.startRecord.style.color = "red";
      this.recording = true;
    } else {
      var self = this;
      this.recorder.stop();
      this.recorder.exportWAV(function(blob) {
        self.WAV = blob;
        var url = window.URL.createObjectURL(self.WAV);
        self.audioRecUrl = url;
      });
      this.$.startRecord.style.color = "white";
      this.recording = false;
    }
  },
  stopRecord: function () {
    this.recording = false;
    var self = this;
    this.recorder.stop();
    this.$.startRecord.style.color = "white";
    this.recorder.exportWAV(function(blob) {
      self.WAV = blob;
      var url = window.URL.createObjectURL(self.WAV);
      self.audioRecUrl = url;
      self.recorder.clear();
    });
  },
  saveRecord: function () {
    this.$.startRecord.style.color = "white";
    this.recording = false;
    var self = this;
    if (self.WAV === null) {
      self.recorder.stop();
      self.recorder.exportWAV(function(blob) {
        self.WAV = blob;
        var url = window.URL.createObjectURL(self.WAV);
        self.audioRecUrl = url;
        self.recorder.clear();
        var formData = new FormData();
        var id = Date.now();
        formData.append('id', id);
        formData.append('name', id);
        formData.append(id, self.WAV);
        self.$.ajax.body = formData;
        self.$.ajax.go();
      });
    } else {
      var formData = new FormData();
      var id = Date.now();
      formData.append('id', id);
      formData.append('name', id);
      formData.append(id, self.WAV);
      self.$.ajax.body = formData;
      self.$.ajax.go();
    }
  },
  handleResponse: function(){
    this.reload();
  },
  stopRecorder: function() {
    this.localMediaStream.stop();
  }
});