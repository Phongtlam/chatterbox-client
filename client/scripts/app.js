// YOUR CODE HERE:
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

var storage = [];

var buttonNames = {};


var Message = function(username, message, roomname) {
  this.username = username;
  this.text = message;
  this.roomname = roomname;
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

  fetch : function() {
    $.ajax({
      url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages?order=-createdAt',
      type: 'GET',
      contentType: 'application/json',
      success: function (data) {
        storage = data.results;
        for (var i = 0; i < 10; i ++){
          // $('#chats').append("<p>" + data.results[i].text + '\n' + "</p>");
          app.renderMessage(storage[i]);
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
    $('#roomSelect').append("<a class='rooms'>" + room.roomname + "</a>");
  },

  handleUsernameClick : function(){
    $('.username').append("<a>" + message.username + "</a>");
  },

  addRooms : function(obj) {
    $('#myDropdown').append("<button class='room'>" + message.roomname + "</button>");
  },

};

$(document).ready(function(){
  //var person = prompt("What is your username?", "Username");
  var name  = window.location.search

  var roomname = 'lobby';
  var person = name.substring(name.indexOf('=') + 1);

  $('#enter').on('click', function() {
    var message = $('#textbox').val();
    var roomname = null;
    var newMessage = new Message(person, message);
    app.send(newMessage);
    app.clearMessages();
    event.preventDefault();
    if (roomname === 'lobby'){
      app.clearMessages();
      storage.filter(function(obj){
        app.renderMessage(obj)
      })
    }
    app.fetch();
  });

  $('#newroom').on('click', function() {
    var room = $('#makeroom').val();
    var newRoom = new Message(null, null, room);
    app.send(newRoom);

    $('#myDropdown').append("<button type='submit'>" + room + "</button>");
    event.preventDefault();
    app.fetch();
  })

  $('#lobby').on('click', function(info) {
    app.clearMessages();
    roomname = 'lobby'
    storage.filter(function(obj) {
      if (obj.roomname === 'lobby') {
        app.renderMessage(obj);
      }
    })
  });



});

app.init();







