var twitter = require('ntwitter');
var updateWithMedia = require('./update-with-media').updateWithMedia;
var keys = require('./twitter-keys');
var twit = new twitter(keys);
var renderEquation = require('./render-equation').renderEquation;

twit.verifyCredentials(function (err, data) {
	console.log(data);
    });


/*
twit.updateStatus('testing twitter for the first time',
		  function (err, data) {
		      console.log(data);
		  });
*/


equation = '\\displaystyle\\frac{d}{dx} \\left( x^3 + 2x^2 - x \\right)';

renderEquation( equation, function(error, data) {
	if (error == null) {
	    updateWithMedia('a polynomial problem', 'mooculus.png', data);
	}
    });

// updateWithMedia('uploading an image', 'mooculus.jpg', data);

var process = function() {
    console.log('whee');
};

//setInterval(function() {process();}, 1000*3);
process();
