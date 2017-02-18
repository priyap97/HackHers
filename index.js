var express=require("express");
var path = require("path");
var bodyParser = require("body-parser");
var sqlite3 = require('sqlite3').verbose()
var app=express();
var db = new sqlite3.Database('dataa.db');
/*db.serialize(function() {
	db.run("CREATE TABLE PEEPS (name TEXT)");
}); */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/',function(req,res){
	var text = req.params.test;
	if(text !== null){
		db.serialize(function() {
				 var stmt = db.prepare("INSERT INTO PEEPS VALUES (?)");
				   stmt.run(text);
				   stmt.finalize()
	});
	}
	db.close();
	res.sendFile(path.join(__dirname + "/index.html"));
});

app.post('/apath',function(req,res){
	var test = req.body.test;
	//now i have the dats
	console.log(test)
	res.send("Hi u");
});
app.listen(8080,function(){
	console.log("priya knows javascript");
});