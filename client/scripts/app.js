// YOUR CODE HERE:
var app = function() {

  var init = function() {
    getMessages();
    setInterval(function() {
      getMessages();
      cleaner();
    }, 5000);
  }

  var cleaner = function() {
    var n = $('.tbody').children();
    if(n.length > 50) {
      console.log("nooo!");
      for(var i = 0; i < 50; i++) {
        console.log($('tr').filter(":last"));
        $('tr').filter(":last").remove();
      }
    }
  }

  var getMessages = function() {
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox',
      dataType: 'json',
      success: displayMessage
    });
  }

  var Message = function(data) {
    this.username = data.username;
    this.text = data.text;
    this.room = data.roomname;
  }

  Message.prototype.printHTML = function() {
    var string = "<tr><td>" + this.username + "</td><td>@ " + this.room + "</td><td>" + this.text + "</td></tr>";
    return string;
  }

  var filter = function(data) {
  //return checker.test(data);
  return /\<|\>|\(.*\)|\=|TEST/.test(data) || (data === "") || (data === undefined);
}

var displayMessage = function(data) {
  var messages = data.results, msg;
    // console.log(messages);
    for(var i = 0; i < messages.length; i++) {
      msg = new Message(messages[i]);
      // console.log(msg.text);
      // console.log(filter(msg.text));
      if(!filter(msg.text) && !filter(msg.username)) {
        $(".tbody").append(msg.printHTML());
        //console.log(msg);
      }
    };
  }

  return {
    init : init
  };
}();

// Display
// Refresh
