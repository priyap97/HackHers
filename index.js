var express=require("express");
var path = require("path");
var bodyParser = require("body-parser");
var sqlite3 = require('sqlite3').verbose()
var app=express();
var db = new sqlite3.Database('dataa.db');
/*db.serialize(function() {
	db.run("CREATE TABLE PEEPS (FirstName varchar(255),LastName varchar(255),Phone varchar(10),mdd varchar(255),anxiety varchar(255),otherInfo varchar(255))");
}); */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/',function(req,res){
	var text = req.params.test;

	//db.close();
	res.sendFile(path.join(__dirname + "/index.html"));
});
app.post('/apath',function(req,res){
	var test = req.body.test;
	//now i have the dats
	console.log(test)
	res.send("Hi u");
});
app.get('/createAccount',function(req,res){
	res.sendFile(path.join(__dirname + "/createAccount.html"));
});
app.post('/accountCreated',function(req,res){
	var firstName=req.body.firstName;
	var lastName=req.body.lastName;
	var phone=req.body.phone;
	var mdd=req.body.mdd;
	var anxiety=req.body.anxiety;
	var otherInfo=req.body.otherInfo;
	if(firstName === null || lastName === null){
		res.redirect('/accountCreated')

	}
	if(phone.length !=== 8){
		res.redirect('/accountCreated')
	}
	
	
	//error checking before continuing
	console.log(firstName+" "+lastName+" has phone number "+phone+"\n mdd="+mdd+"\n anxiety="+anxiety+"\n otherInfo=\n"+otherInfo);
	db.serialize(function() {
		 var stmt = db.prepare("INSERT INTO PEEPS VALUES (?,?,?,?,?,?)");
		   stmt.run(firstName,lastName,phone,mdd,anxiety,otherInfo);
		   stmt.finalize();

	});
	db.close();
	res.send("Thank you!");
});
app.listen(8080,function(){
	console.log("priya knows javascript");
});
