  /// call your function here
var mdd = ''
var anx = ''
var otherinfo=''
var cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)username\s*\=\s*([^;]*).*$)|^.*$/, "$1");
setInterval(function(){ 

	$.get('/talkerdata',function(data,err){
			console.log(data);
			console.log(document.cookie);
			if(mdd === '' && anx === '' && otherinfo === ''){
			var list = document.getElementById('ULIST');
			var entry = document.createElement('li');
			for(var i = 0;i<data.length;i++){
					console.log("GOT HERE");
					if(data[i].data.mdd !== ''){
						mdd = 'true'
								
					entry.appendChild(document.createTextNode("HAS MDD"));
							
					list.appendChild(entry);
					}

					if(data[i].data.anx !== ''){
						anx = 'true'

					entry.appendChild(document.createTextNode("HAS ANX"));
						
					list.appendChild(entry);
					}
					
					if(data[i].data.otherinfo !== ''){
						otherinfo = data.data.info;

					entry.appendChild(document.createTextNode(otherinfo));
						
					list.appendChild(entry);
					}

				
				break;

			}
			}


	});
    //code goes here that will be run every 5 seconds.    
}, 5000);

