var tools = require('./chek.tools.js');
tools.CheckOrBuildDatabase();

var upbody = "";

var request = require('request');


for (var i = 0; i < 256; i++) {
	checkIP(i);

}

function checkIP(ip) {

	url = "http://192.168.86." + ip + ":3000/up.json";
	request(url, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
		console.log(url);
	        upbody = body
		console.log(upbody);
		var parsedJSON = JSON.parse(upbody); // require('./servicesample.json');
		console.log("hostname " + parsedJSON.hostname);
		try {
			tools.AddData(parsedJSON.hostname,parsedJSON.ip,parsedJSON.networkssid);
		} catch (err) {
			console.log(err);
		}
		try {
			tools.DisplayData();
		} catch (err) {
			console.log(err);
		}
	     }
	})
}

	




