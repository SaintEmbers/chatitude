//event emitter

(function(){

 window.App = new Events();


})();


(function(){

   

	var data = [];
	var key = null;

	window.chatStorage = {
		
		get: function(){
		  $.ajax({
            type: 'GET',
            url: 'http://chat.api.mks.io/chats'
          }).success(function (chats) {
          	data = chats;
            // console.log("Got chats:", chats);
            App.emit('newUpdate');

          });
		},

		signup: function(user, pass){
			$.ajax({
			type:'POST',
			url:'http://chat.api.mks.io/signup',
			data: {username: user,password:pass}
			}).success(function(){

				alert('You are a new user')
			}).error(function(data){
				console.log(error);
				App.emit('fail');
			})
		},
		signin: function(user,pass){
			console.log('works');
			$.ajax({
			type:'POST',
			url:'http://chat.api.mks.io/signin',
			data: {username: user ,password: pass}
			}).success(function(api){
				//console.log('logged in')
				key=api;
				localStorage.setItem("key",key['apiToken']);
				//console.log(key)
				App.emit('logged-in');
			})
		},
		
		post:function(tweet){
			if(!key){ key ={'apiToken':0}; 
				key['apiToken'] = localStorage.getItem("key");}
			$.ajax({
            type: 'POST',
            url: 'http://chat.api.mks.io/chats',
            data : {apiToken: key['apiToken'], message:tweet}
          }).success(function (chats) {
          	
          	console.log('i think this works')
            App.emit('posted');
     

          });

		},	
	
		dis: function(func){
			return data.reverse().map(func);
			
		},
		temp:function(){
			console.log(key);
		}
		//create login--get login ID
		//post function
		//

		
    };
	
	

})();