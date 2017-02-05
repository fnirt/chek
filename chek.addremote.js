var tools = require('./chek.tools.js');
tools.CheckOrBuildDatabase();

var upbody = "";

var request = require('request');
request('http://stuxred:8080/up.json', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        upbody = body
	console.log(upbody);
	var parsedJSON = JSON.parse(upbody); // require('./servicesample.json');
console.log("hostname " + parsedJSON.hostname);
	tools.AddData(parsedJSON.hostname,parsedJSON.ip,parsedJSON.networkssid);
	tools.DisplayData();
     }
})


	




