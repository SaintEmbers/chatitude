(function(){

	window.ChatView = {};

	//controller is going to have functions for signup, signin, and submit
	ChatView.Controller={};
	ChatView.Controller.signup= function(username, password){
		//get values
		// var username = $('#user').val();
		// var password = $('#pass').val();
		//test values for edges
		if(username.length < 2 || password.length < 2){
			alert('Don"t be lazy')
		} else{
			chatStorage.signup(username, password);
		}
		//call chatStorage function
	}
	ChatView.Controller.signin= function(username,password){
				//get values
			if(username.length < 2 || password.length < 2){
			alert('Don"t be lazy')
		} else{
			chatStorage.signin(username, password);
		}
	}
    ChatView.Controller.send= function(message){
    	chatStorage.post(message);
    }
	

	ChatView.builder = function(obj){
		return $('<div class="tweet">').append($('<p class="name">').text(obj.user), $('<p class="text">').text(obj.message));
	}

	ChatView.forms = function(){
		return $('<div class="forms">').append(
			$('<div class="loginclass">').text('Username:').append($('<input type="text" id="user" >')),
			$('<div class="loginclass">').text('Password:').append($('<input type="password" id= "pass">')),
			$('<button class="button">').text('New User').on('click',function(){
				//run function with data in like ChatView.Controller.signup($('#user).val(),$("#pass").val())
				var username = $('#user').val();
		        var password = $('#pass').val();
				ChatView.Controller.signup(username,password)}),
			$('<button class="button">').text('Log In').on('click',function () {
				var username = $('#user').val();
		        var password = $('#pass').val();
				ChatView.Controller.signin(username,password)
			}),
			$('<div class = "send">').append(
				$('<input type="chat" id="tweet">'),
				$('<button>').text('Send').on('click',
					function () {
						var message = $('#tweet').val();
						ChatView.Controller.send(message);
						chatStorage.get();
					})
				)

			)
	}

	ChatView.render = function(elem){
		//empty element and populate with new messages
		elem.empty().prepend(chatStorage.dis(ChatView.builder));

		//call on a html builder
		  //which will have the indivual tweet elements
		//run that element on model map function
	}

	ChatView.Mount = function(elem){
		//first put in forms and functions attached(signin and submit message)
		//form functions
		elem.append(ChatView.forms());
		elem.append($('<div id="board">'));
		var messageBoard = $('#board');
		chatStorage.get();
		setInterval(chatStorage.get, 20000);
		App.on('newUpdate',function(){ChatView.render(messageBoard);})

		//call a render function to put messages on the page
		//setInterval
		//
	}



})()

$(document).ready(function(){
	setInterval(animateDiv,5000);
	})
var animateDiv= function(){
	
	var $divs = $('div');
	var divs = $.makeArray( $divs);
	for(var x =0 ; x<divs.length;x++){
		var neg = Math.floor(Math.random()*10);
		if (neg<5){var g = '+='}
		else{var g = "-="}
		var l = Math.floor(Math.random()*100)
		
		divs[x].animate({"left":g+l},"fast");
		}
}

//view 
// html button that has emit('get data')
// html script setinterval ( get data)
//control
// listin for (get data) and modify the model



         // <div class='texts'>
	        //  Username:<br>
	        //  <input type="text" name="username" id="username">
         //  </div>
         //  <div class = 'texts'>
         //  password:<br>
         //  <input type="text" name="lastname" id="password">
         //  </div>
         //  <button id='newuser'>New User</button><button id='olduser'>Old User</button>