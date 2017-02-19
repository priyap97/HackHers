var express=require("express");
var path = require("path");
var bodyParser = require("body-parser");
var sqlite3 = require('sqlite3').verbose()
var app=express();
var userinfo = [];
app.use(express.static('public'))
var cookieParser = require('cookie-parser')
//var home=require('./routes/home');
//var call=require('./routes/call');
var twilio = require('twilio')
app.use(cookieParser());
var db = new sqlite3.Database('dataa.db');
var listeners=[]
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
					 res.cookie('username',user, { maxAge: 900000, httpOnly: false })
					res.redirect("/thepage");
				}

		//rows contain values while errors, well you can figure out.
});
          });

});
app.get('/thepage',function(req,res){
	res.sendFile(path.join(__dirname + "/radio.html"));

});
app.post('/auth', function(req,res){
	var cook = {
			'phone':req.cookies.username,
			'islisten': req.body.listen
	}
	res.cookie('kek',cook,{maxAge:900000, httpOnly:false});
	//res.sendFile(path.join(__dirname + "/list.html"));
	//res.send("DONE");
	res.redirect('/list');
});
app.get('/list',function(req,res){
	console.log(req.cookies);
	var data = req.cookies.kek;
	listeners.push(data);
	if(data.islisten ==='true'){
		
		res.send('Has MDD, has  anxiety, Here is some other info about  me\nIf your talker has MDD, please be careful to ensure that they are not in a crisis/suicidal situation. If they appear excessively distressed, advise them to call 911. If your talker has anxiety issues, remind them to breathe and focus on their surroundings in order to curb any panic or anxiety attacks. Also take the other information section into account and be sure not to press them on triggering ideas.');
	}
	else{
		res.sendFile(path.join(__dirname + "/room.html"));
	}
	//res.send("DONE");
});
app.get('/sendlist',function(req,res){
	res.send(listeners);
});
app.post('/generateToken',function(req,res){
	var c=new twilio.Capability('SID','AUTHTOEJ');
	c.allowClientOutgoing('APPSID');
	var tok=c.generate();
	console.log(tok);
	var send={
		'token':tok
	}
	  res.send(send);
});
app.post('/connect',twilio.webhook({validate: false}),function(req,res){

	console.log(req.cookies);
	var phoneNumber=req.body.phoneNumber;
	var callerId='18562427020';
        var twiml = new twilio.TwimlResponse();
	var numberDialer=function(dial){
		dial.number(phoneNumber);
	};
	var clientDialer=function(dial){
		dial.client("support_agent");
	};
		
	if (phoneNumber != null) {
		twiml.dial({callerId : callerId}, numberDialer);
	  }else {
		twiml.dial({callerId : callerId}, clientDialer);
	  }
	   
	  res.send(twiml.toString());
});

app.get('/talkerdata',function(req,res){
	res.send(userinfo);
});
app.listen(8080,function(){
	console.log("priya knows javascript");
});
