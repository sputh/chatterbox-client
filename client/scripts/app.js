// YOUR CODE HERE:
var app = function() {

  var init = function() {
    fetch();
    setInterval(function() {
      fetch();
      cleaner();
    }, 50000);
  }

  var cleaner = function() {
    var n = $('.tbody').children();
    if(n.length > 50) {
      // console.log("nooo!");
      for(var i = 0; i < 48; i++) {
        // console.log($('tr').filter(":last"));
        $('tr').filter(":last").remove();
      }
    }
  }

  var fetch = function() {
    $.ajax({
      url: 'https://api.parse.com/1/classes/chatterbox?order=-createdAt',
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

  var send = function() {
    var message = {};
    message.text = $('#text').val();
    var usr = window.location.search;
    message.username = usr.substring(10, usr.length);
    message.roomname = "basement";
    $.ajax({
    // always use this url
    url: 'https://api.parse.com/1/classes/chatterbox',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // see: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message');
    }
    });
  }

var displayMessage = function(data) {
  var messages = data.results, msg;
    // console.log(messages);
  var clean = [];
    for(var i = 0; i < messages.length; i++) {
      msg = new Message(messages[i]);
      if(!filter(msg.text) && !filter(msg.username)) {
        //$(".tbody").prepend(msg.printHTML());
        clean.push(msg);
      }
    };
    makeBubbles(clean);
  }

  return {
    init : init,
    send : send,
    fetch : fetch
  };
}();

$(document).on('ready', function(){
  d3.select('svg').attr({
  "width": 1280,
  "height": 760,
  "border-style" : "solid",
  "border-width" : "5px"
  })
  $('#send').on('click', function(event){
    event.preventDefault();
    app.send();
  });

  $('tbody').on('click', function(event){
    event.preventDefault();
  });


})
// Need to collect an array of all the rooms--unique names
// Filter data from fetch() by room name
  // d3.data(^).append array of objects of EACH room to individual g/svg element
  // allow for click of room to open queue of messages
  // attr(radius to data.length)
  // TO START: create an array of room names, generate a set of bubbles with roomname text
var basement = [{text, username}]
// when queue opens, have text area at the bottom

/*
var makeBubbles = function(msgs){
  var rooms = {};
  var numrooms = 0;
  for(var k = 0; k < msgs.length; k++){
    if(rooms[msgs[k].room] === undefined) {
      rooms[msgs[k].room] = 0;
    }
    rooms[msgs[k].room] += 1;
  }

}
*/
