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





var App = function(username, message, roomname) { 
  this.username = username,
  this.text = message,
  this.roomname = roomname
};

var app = new App();

// var message = new App('shawndrost','trololo', '4chan');

// var message = {
//   username: 'shawndrost',
//   text: 'trololo',
//   roomname: '4chan'
// };
var server = 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages';
// variable for saving data returned after fetch
var output;

App.prototype.init = function() {
  this.fetch();
};

App.prototype.send = function(message) {
  $.ajax({
  type: 'POST',
  data: JSON.stringify(message), //message? 
  contentType: 'application/json',
  success: function (data) {
    console.log('chatterbox: Message sent');
  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to send message', data);
  }
});
};

App.prototype.fetch = function() {
  $.ajax({
  url: server,
  type: 'GET',
  contentType: 'application/json',
  success: function (data) {
    for (var i = 0; i < 10; i ++){
      $('#chats').append("<p>" + data.results[i].text + '\n' + "</p>");
    }
    

  },
  error: function (data) {
    // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
    console.error('chatterbox: Failed to receive message', data);
  }
});
}

App.prototype.clearMessages = function() {
  $('#chats').empty(); //this might be funky, destroys everything - caveman
}

App.prototype.renderMessage = function(message) {
  $('#chats').append("<p class='text'>" + "<a class='username'>" + message.username + "</a>" + ':' + message.text + "</p>");
}

App.prototype.renderRoom = function(room) {
  $('#roomSelect').append("<a class='rooms'>" + message.roomname + "</a>");

}

App.prototype.handleUsernameClick = function(){
    $('.username').append("<a>" + message.username + "</a>");
  };

// $(document).on('click', '.username', function(){
//   this.handleUsernameClick();
// })

app.init();





