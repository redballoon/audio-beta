var cylon = require('cylon');
var speaker = require('speaker');
//var fft = require('fft-js').fft;
//var fft_util = require('fft-js').util;
var fs = require("fs");


var options = {
	channels : 1,
	sample_rate : 48000,
	fm : false,
	freq : 100.1,
	min_freq : 20,
	max_freq : 15000,
	chunk_size : 2048// use multiple of 8
};

var methods = {
	////////////////////////
	// attempt to play wav
	////////////////////////
	wave_test : function (my) {
		var path = './assets/audio-sample.wav';
		//my.connections.audio.speaker
		var spk = new speaker({
			channels: 1,
			bitDepth: 16,
			sampleRate: 8000,
			signed: true
		});
		var readStream = fs.createReadStream(path);
		readStream.pipe(spk);
	},
	wave_test_2 : function (my) {
		var path = './assets/laugh.wav';
		var spk = new speaker({
			channels: 1,
			bitDepth: 16,
			sampleRate: 48000,
			signed: true
		});
		var readStream = fs.createReadStream(path);
		readStream.pipe(spk);
	},
	mp3_test : function (my) {
		var path = './assets/audio-sample.mp3';
		my.audio.on('playing', function(song){
			console.log('Playing this nice tune: "' + song + '"');
		});
		my.connections.audio.play(path);
	},
	mp3_test_2 : function (my) {
		var path = './assets/audio-sample.mp3';
		my.audio.on('playing', function(song){
			console.log('Playing this nice tune: "' + song + '"');
		});
		my.connections.audio.speaker = new speaker({
			channels: 1,
			bitDepth: 16,
			signed: true
		});
		my.connections.audio.play(path);
	}
};
cylon.robot({
	connections: {
		//arduino: { adaptor : 'firmata', port: '/dev/cu.usbmodem1421' },
		audio: { adaptor: 'audio' }
	},
	devices: {
		audio: { driver: 'audio' }//,
		//pin: { driver: 'direct-pin', pin : 4 }
	},
	work: function(my) {
		
		////////////////////////
		// attempt to play wav
		// low quality
		////////////////////////
		//methods.wave_test(my);
		////////////////////////
		
		////////////////////////
		// attempt to play mp3
		////////////////////////
		methods.mp3_test(my);
		////////////////////////
		
		//var buff = new Buffer(1024 * ((16 / 8) * 1));
		//my.pin.analogWrite(1);
		
		//44100
		// 2 channels
		//bitDepth 16
		//samplesPerFrame: 1024,
		
		//console.log(my.audio.connection.decoder);
		
		/*
		var readStream = fs.createReadStream(path);
		readStream.pipe(my.audio.connection.decoder);
		setTimeout(function () {
			var buffer = my.audio.connection.decoder._readableState.buffer;
			var phasors = fft(buffer[0]);
			var frequencies = fft_util.fftFreq(phasors, 44100);
			var magnitudes = fft_util.fftMag(phasors);
			var results = frequencies.map(function (f, ix) {
				return { frequency : f, magnitude : magnitudes[ix] };
			});
			
			console.log(results);
		}, 2000);
		*/
		//this.emit("playing", trackPath);
		
	}
}).start();