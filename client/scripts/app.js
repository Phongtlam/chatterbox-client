// YOUR CODE HERE:
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}



// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}


// var App = function(username, message, roomname) { 
//   this.username = username,
//   this.text = message,
//   this.roomname = roomname
// };

var app =  {
  server : 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
  send : function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
      console.log('chatterbox: Message sent');
      },
      error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
      }
    });
  },

  fetch : function() {
    $.ajax({
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages?order=-createdAt',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        for (var i = 0; i < 10; i ++){
          // $('#chats').append("<p>" + data.results[i].text + '\n' + "</p>");
          App.renderMessage(data.results[i])
        }
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message', data);
      }
    });
  },

  init: function() {
    app.fetch();
  },

  clearMessages : function() {
    $('#chats').empty(); //this might be funky, destroys everything - caveman
  },

  renderMessage : function(message) {
    $('#chats').append("<p class='text'>" + "<a class='username'>" + message.username + "</a>" + ':' + message.text + "</p>");
  },

  renderRoom : function(room) {
    $('#roomSelect').append("<a class='rooms'>" + message.roomname + "</a>");

  },

  handleUsernameClick : function(){
      $('.username').append("<a>" + message.username + "</a>");
  },
}

// $(document).on('click', '.username', function(){
//   this.handleUsernameClick();
// })

$(document).ready(function(){
  //var person = prompt("What is your username?", "Username");
  $('#input').submit(function(info) {
    var message = $('#textbox').val();
    var person = $('#textbox').val();
    var roomname = null;
    var app = new App(person, message, roomname);
    app.send(app);
    info.preventDefault();
  })
})

// var message = {
//   username: 'SUPERMAN',
//   text: 'SUPPPPERR',
//   roomname: '4chan'
// };

// var app = new App();
// app.init();
// app.send(message);
// app.fetch();


