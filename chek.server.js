var tools = require('./chek.tools.js');
tools.CheckOrBuildDatabase();
// content of index.js
const http = require('http')  
const port = 3000

const requestHandler = (request, response) => {  

  console.log(request.url)

	var os = require("os");
	var hostname = os.hostname();
	var localip = require('local-ip');
	var interface = 'wlan0';
	var ip = "";
	var iwconfig = require('wireless-tools/iwconfig');
	var myssid = ""; 

	iwconfig.status('wlan0', function(err, status) {
  		myssid=status.ssid;
		console.log("this network is " + myssid);



		localip(interface, function(err, res) {
			if (err) {
	    			throw new Error('I have no idea what my local ip is.');
	  		}	
	  		console.log('My local ip address on ' + interface + ' is ' + res);
			ip = res;

			var pichek = {
			    hostname: hostname,
				ip: ip,
			    networkssid: myssid,
			    extra: "from chek.server.js"
			  }
		
			var convertedObjects = JSON.stringify(pichek);
			  response.end(convertedObjects)
		
			});
		});

}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {  
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})

 




