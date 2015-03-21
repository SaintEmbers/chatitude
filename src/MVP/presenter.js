// View chat messages (without signing in)
(function(){

  window.ChatControl = {};

  ChatControl.Control = function(element){

  	var $view = $(element);
  	var that = this;

  	this.render= function(){
  		
  		$view.empty().prepend(
  		//call on html construct and map args on constructon
  		chatStorage.dis(ChatControl.tweetdiv)
  		)
  	}
  }
  ChatControl.tweetdiv = function(args){
  return $('<div class ="tweet">').append($('<p class ="username">').text(args.user),
  		   $('<p class ="message">').text(args.message))
  }

//function that we call in the html needs to make a new instance of ChatControl constructor
//render the messages to the page
	ChatControl.mount=function(node){
		var displayPresenter = new ChatControl.Control(node)
		chatStorage.get();
	    App.on('newUpdate', function(){displayPresenter.render();})
	    $('#newuser').on('click', function(){
		   SignIn.NewUser();
		   console.log('works')
		})
		$('#olduser').on('click', function(){
		   SignIn.OldUser();
		   console.log('click')
		})
		$('#send').on('click', function(){
		   SignIn.Message();
		   console.log('click')
		})
	}

	window.SignIn = {};

	SignIn.NewUser = function(){
		var username = $('#username').val();
		var password = $("#password").val();
		if(username.length<2||password.length<2){alert("need more data")}
		else{chatStorage.signup(username, password);}
    };
    SignIn.OldUser=function(){
    	var username = $('#username').val();
		var password = $("#password").val();
		console.log('gotdata')
		if(username.length<2||password.length<2){alert("need more data")}
		else{chatStorage.signin(username, password);}
    }
    SignIn.Message=function(){
    	var message = $('#message').val();
    	console.log(message);
    	if(message.length<2){
    		alert('are you lazy?')
    	}
    	else{chatStorage.post(message);};
    }

    //message is working in the console but not in our code so:
    // We need to find out at which stage it is breaking and find
    //

    // A way to update our page



})();















// Protect the user against XSS attacks
// Sign up for an account
// Sign in
// Make a user stay signed in even after they refresh the page (hint: use localStorage)
// Post a chat message