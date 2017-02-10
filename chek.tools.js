var fs = require("fs");
var file = "./PiCheck.db";
var exists = fs.existsSync(file);

// tools.js
// ========
module.exports = {
	CheckOrBuildDatabase: function () {
		console.log("Checking for Database");
		if(!exists) {
			console.log("Creating DB file.");
			fs.openSync(file, "w");
		}
		console.log("All is well");
	},
	DisplayData: function() {
		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);
		
		db.serialize(function() {
		        if(!exists) {
		                db.run("CREATE TABLE picheckins (    id INTEGER PRIMARY KEY   AUTOINCREMENT,servername TEXT,ip TEXT,lastseen TEXT,jsondata TEXT);");
		        }
		


db.all("SELECT *  FROM picheckins", function(err, rows) {

        rows.forEach(function (row) {
		callback(row);
        })
	});



//		        db.each("SELECT top 10 * FROM picheckins order by lastseen desc ", function(err, row) {
//		                console.log(row.id +
//		                ": " + row.servername +
//		                ": " + row.ip +
//		                ": " + row.lastseen +
//		                ":" + row.jsondata);
//	        	        });
		        });
	
		db.close();


	},
	AddData: function(servername,ip,jsondata) {
		// do stuff here
		var sqlite3 = require("sqlite3").verbose();
		var db = new sqlite3.Database(file);

		db.serialize(function() {

	        	var stmt = db.prepare("INSERT INTO picheckins ( servername ,ip ,lastseen ,jsondata ) VALUES (?,?,?,?)");
	        	var dateFormat = require('dateformat');
       			var now = new Date();
        		var timestamp = dateFormat(now, "isoDateTime");

        		stmt.run(servername,ip,timestamp,jsondata);
        		stmt.finalize();
		});
		db.close();
	},
	bar: function () {
    		// whatever
  	}
};

var zemba = function () {
	console.log("foo");
}

function callback(row) {
                console.log(row.id +
                ": " + row.servername +
                ": " + row.ip +
                ": " + row.lastseen +
                ":" + row.jsondata);

}
