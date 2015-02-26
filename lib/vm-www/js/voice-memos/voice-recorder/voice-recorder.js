	var VoiceRecorder = function (stream, cfg){
		var WORKER_PATH = 'voice-recorder-worker.js';
		var config = cfg || {};
		var recording = false;
		var currCallback;

		var bufferLen = config.bufferLen || 4096;
    var numChannels = config.numChannels || 1;
  	var audio_worker = config.worker || WORKER_PATH;

  	var context = stream.context;
  	var node = context.createScriptProcessor(bufferLen, numChannels, numChannels);

  	var worker = new Worker(audio_worker);
		worker.postMessage({
      command: 'init',
      config: {
        sampleRate: context.sampleRate,
        numChannels: numChannels
      }
    });

		node.onaudioprocess = function(input){
      if (!recording) {
      	return;
      };

      worker.postMessage({
        command: 'record',
        buffer: input.inputBuffer.getChannelData(0)
      });
    }

    this.exportWAV = function(cb){
      currCallback = cb;
      type = 'audio/wav';
      worker.postMessage({
        command: 'exportWAV',
        type: type
      });
    }

    worker.onmessage = function(e){
      var blob = e.data;
      currCallback(blob);
    }

    this.record = function () {
  		recording = true;
    };

    this.stop = function () {
  		recording = false;
    };

    this.clear = function(){
      worker.postMessage({ command: 'clear' });
    }

		stream.connect(node);
		node.connect(context.destination);
	};
