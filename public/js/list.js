  /// call your function here
var prev = "";
var counter = 0;
var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
	$.get('/sendlist',function(data,err){
			var list = document.getElementById('ULIST');
			var entry = document.createElement('li');
			console.log(cookieValue);

			for(var i =0;i<data.length;i=i+1){
				if(cookieValue !== data[i].phone){
					var listenvalue;
					if(data[i].islisten === 'true'){
						listenvalue = "Listerner"
					} else{
						listenvalue = "Talker!"
					}
					entry.appendChild(document.createTextNode("Person " + i + " " + listenvalue));
					counter = i;
					list.appendChild(entry);
			}
			}

	});
setInterval(function(){ 

	$.get('/sendlist',function(data,err){
			console.log(data);
			console.log(document.cookie);
			var list = document.getElementById('ULIST');
			var entry = document.createElement('li');
			var current = data[data.length-1].phone
			if(current !== prev && current !== cookieValue){ 

				var listenvalue;
				if(data[data.length-1].islisten === 'true'){
					listenvalue = "Listerner"
				} else{
					listenvalue = "Talker!"
				}
				entry.appendChild(document.createTextNode("Person " + counter +" " + listenvalue));
				list.appendChild(entry);
				prev = current;
				counter++;

			}


	});
    //code goes here that will be run every 5 seconds.    
}, 5000);

