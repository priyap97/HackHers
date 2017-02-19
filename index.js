var express=require("express");
var path = require("path");
var bodyParser = require("body-parser");
var sqlite3 = require('sqlite3').verbose()
var app=express();
var db = new sqlite3.Database('dataa.db');
db.serialize(function() {
	//db.run("CREATE TABLE PEEPS (FirstName varchar(255),LastName varchar(255),Phone varchar(10),password varchar(255),mdd varchar(255),anxiety varchar(255),otherInfo varchar(255))");
});
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
app.get('/login',function(req,res){
	
	res.sendFile(path.join(__dirname + "/login.html"));

});
app.post('/accountCreated',function(req,res){
	var firstName=req.body.firstName;
	var lastName=req.body.lastName;
	var phone=req.body.phone;
	var password=req.body.password;
	var mdd=req.body.mdd;
	var anxiety=req.body.anxiety;
	var otherInfo=req.body.otherInfo;
	if(firstName === null || lastName === null){
		res.redirect('/accountCreated')

	}
	if(phone.length !== 10){
		res.redirect('/accountCreated')
	}


	//error checking before continuing
	console.log(firstName+" "+lastName+" has phone number "+phone+"\n mdd="+mdd+"\n anxiety="+anxiety+"\n otherInfo=\n"+otherInfo);
	db.serialize(function() {
		 var stmt = db.prepare("INSERT INTO PEEPS VALUES (?,?,?,?,?,?,?)");
		   stmt.run(firstName,lastName,phone,password,mdd,anxiety,otherInfo);
		   stmt.finalize();
	});
	res.send("Thank you!");
});
app.post('/loginauth',function(req,res){
	     var user = req.body.Username;
	     var pass = req.body.Password;
	     db.serialize(function() {

		     db.all("SELECT password from PEEPS where Phone="+user,function(err,rows){
			     if(rows[0]===null || pass !== rows[0].password){
					res.redirect('/login')	
				    }
			     	else{
					res.redirect("/thepage");
				}
		
		//rows contain values while errors, well you can figure out.
});
          });

});
app.get('/thepage',function(req,res){
	res.sendFile(path.join(__dirname + "/radio.html"));
	
});
app.listen(8080,function(){
	console.log("priya knows javascript");
});
