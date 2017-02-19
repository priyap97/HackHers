$(document).ready(function(){
	$.post('/generateToken',function(data){
		Twilio.Device.setup(data.token);
	});
	//function updat
	Twilio.Device.ready(function(device){
		//updateCallStatus("Ready");
	});
	$.get('/sendlist',function(data,err){
		var isListener="";
		var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
		for(var i=0;i<data.length;i++){
			if(cookieValue!==data[i].phone && data[i].islisten==='true') {
				isListener=data[i].phone;
				break;
			}
		}
		Twilio.Device.connect(function (connection) {
		  // Enable the hang up button and disable the call buttons
		  //hangUpButton.prop("disabled", false);
		 // callCustomerButtons.prop("disabled", true);
		 // callSupportButton.prop("disabled", true);
		 // answerButton.prop("disabled", true);

		  // If phoneNumber is part of the connection, this is a call from a
		  // support agent to a customer's phone
		  if ("phoneNumber" in connection.message) {
			//updateCallStatus("In call with " + connection.message.phoneNumber);
		  } else {
			// This is a call from a website user to a support agent
			//updateCallStatus("In call with support");
		  }
		});

		function callCustomer(phoneNumber){
			updateCallStatus("Calling");
			var params={"phoneNumber":phoneNumber};
			Twilio.Device.connect(params);
		}
	});
});