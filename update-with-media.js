var OAuth= require('oauth').OAuth;
var https = require('https');
var keys = require('./twitter-keys');

function updateWithMedia( tweet, photoName, data ) {
    var oauth = new OAuth(
			  'https://api.twitter.com/oauth/request_token',
			  'https://api.twitter.com/oauth/access_token',
			  keys.consumer_key, keys.consumer_secret,
			  '1.0', null, 'HMAC-SHA1');
    
    var crlf = "\r\n";
    var boundary = '---------------------------10102754414578508781458777923';

    var separator = '--' + boundary;
    var footer = crlf + separator + '--' + crlf;
    var fileHeader = 'Content-Disposition: file; name="media"; filename="' + photoName + '"';
    
    var contents = separator + crlf
	+ 'Content-Disposition: form-data; name="status"' + crlf
	+ crlf
	+ tweet + crlf
	+ separator + crlf
	+ fileHeader + crlf
	+ 'Content-Type: image/png' + crlf
	+ crlf;
    
    var multipartBody = Buffer.concat([
				       new Buffer(contents),
				       data,
				       new Buffer(footer)]);
    
    var hostname = 'api.twitter.com';
    var authorization = oauth.authHeader(
					 'https://api.twitter.com/1.1/statuses/update_with_media.json',
					 keys.access_token_key, keys.access_token_secret, 'POST');
    
    var headers = {
	'Authorization': authorization,
	'Content-Type': 'multipart/form-data; boundary=' + boundary,
	'Host': hostname,
	'Content-Length': multipartBody.length,
	'Connection': 'Keep-Alive'
    };
    
    var options = {
	host: hostname,
	port: 443,
	path: '/1.1/statuses/update_with_media.json',
	method: 'POST',
	headers: headers
    };
    
    var request = https.request(options);     
    request.write(multipartBody);
    request.end();
    
    request.on('error', function (err) {
	    console.log('Error: Something is wrong.\n'+JSON.stringify(err)+'\n');
	});
    
    request.on('response', function (response) {            
	    response.setEncoding('utf8');            
	    response.on('data', function (chunk) {
		    console.log(chunk.toString());
		});
	    response.on('end', function () {
		    console.log(response.statusCode +'\n');
		});
	});   

    return;
}

module.exports.updateWithMedia = updateWithMedia;
