var tools = require('./chek.tools.js');
tools.CheckOrBuildDatabase();



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

			tools.AddData(hostname,ip,myssid);
			tools.DisplayData();
	
		});
	});
 




