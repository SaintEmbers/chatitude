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
				alert('error:', data);
			})
		},
		signin: function(user,pass){
			$.ajax({
			type:'POST',
			url:'http://chat.api.mks.io/signin',
			data: {username: user ,password: pass}
			}).success(function(api){
				key=api;
				localStorage.setItem("key",key['apiToken']);
			}).error()
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
			console.log(data);
		}
		//create login--get login ID
		//post function
		//

		
    };
	
	

})();