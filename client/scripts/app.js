// YOUR CODE HERE:
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}



// // Close the dropdown menu if the user clicks outside of it
// window.onclick = function(event) {
//   if (!event.target.matches('.dropbtn')) {
//     var dropdowns = document.getElementsByClassName("dropdown-content");
//     var i;
//     for (i = 0; i < dropdowns.length; i++) {
//       var openDropdown = dropdowns[i];
//       if (openDropdown.classList.contains('show')) {
//         openDropdown.classList.remove('show');
//       }
//     }
//   }
// };


var message = {
  username: 'SUPERMAN',
  text: 'SUPPPPERR',
  roomname: '4chan'
};

var storage = [];

var buttonNames = {};


var Message = function(username, message, roomname) {
  this.username = username;
  this.text = message;
  this.roomname = username;
}

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

  fetch : function(roomname) {
    $.ajax({
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages?order=-createdAt',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        storage = data.results;
        for (var i = 0; i < 10; i ++){
          if (!roomname === undefined ){
            if (data.results[i].roomname === roomname){
              app.renderMessage(data.results[i])
            }
          } else {
          // $('#chats').append("<p>" + data.results[i].text + '\n' + "</p>");
          app.renderMessage(data.results[i])
        }
        }
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message', data);
      }
    });
  },

  init: function() {
    $('#input').on('click', function() {
      var person = $('#textbox').val();
      var message = $('#textbox').val();
      console.log(message)
      //var message = 'HELLO WE ARE HERE';
      var roomname = null;
      var newMessage = new Message(person, message, roomname);
      app.send(newMessage);
      info.preventDefault();
    })
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

  addRooms : function(obj) {
    $('#myDropdown').append("<button class='room'>" + message.roomname + "</button>");
  },

};

// $(document).on('click', '.username', function(){
//   this.handleUsernameClick();
// })
$(document).ready(function(){
  //var person = prompt("What is your username?", "Username");
var name  = window.location.search

  var roomname = 'lobby';
  var person = name.substring(name.indexOf('=') + 1);
  console.log(person);
  $('#enter').on('click', function(info) {

    var message = $('#textbox').val();
    var newMessage = new Message(person, message, roomname);
    console.log(newMessage)
    app.send(newMessage);
    app.clearMessages();
    info.preventDefault();
    // if (roomname === 'lobby'){
    //   app.clearMessages;
    //   storage.filter(function(obj){
    //     app.renderMessage(obj)
    //   })
    // }
    app.fetch(roomname);
  });

  $('#lobby').on('click', function(info) {
    app.clearMessages();
    roomname = 'lobby'
    storage.filter(function(obj) {
      if (obj.roomname === 'lobby') {
        app.renderMessage(obj);
      }
    })
  })



})

app.init();
// app.send(message);
// app.fetch();
var makeList = function(){
  for (var i = 0; i < storage.length; i++){
    buttonNames[storage[i].roomname] = storage[i].roomname;
    console.log(storage[i].roomname)
  }
}

makeList();