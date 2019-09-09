var message = $('#message');
var usrnm = "";
var chatroom = $('#chat-room');
var send = $('#send-button');
var exists = $('#exists');
console.log('hello')
var socket = io();
socket.emit('username');
$(document).on("click", "#send-button", function () {
    // console.log("send")
    var rusrnm = $("#message").val().split(" ");
    var reciever = rusrnm.shift();
    var msgs = "You : " + rusrnm.join(" ");
    console.log(socket)
    var msgr = socket.username + " : " + rusrnm.join(" ");
    $("#chat-room").append(`<div ><section  id='send'><p>` + msgs + `</p></section></div>`);
    var elem = document.getElementById('chat-room')
    elem.scrollTop = elem.scrollHeight;
    if ($("#message").val().length > 0) {
        // console.log(")
        // console.log(rusrnm)
        // console.log(socket.username);
        socket.emit('message', msgr, reciever);
        $("#message").val('');
    }
})
socket.on('set-username', function (u) {
    socket.username = u;
})
socket.on('showmsg', function (msg) {
    // console.log(socket.username);

    $("#chat-room").append(`<div ><section id='recieve'><p >` + msg + `</p></section></div>`);
    var elem = document.getElementById('chat-room')
    elem.scrollTop = elem.scrollHeight;

})
socket.on('exists', function () {
    document.getElementById('exists').style.display = "block";
})
socket.on('nexists', function () {

    // document.getElementById('exists').style.display = "none";
    // document.getElementById('body').innerHTML = ` <div id="chat-room">

    // </div>
    // <div id="bottom">

    //     <input id="message" type="text"> <button id="send-button" type="submit">Send</button>
    // </div>`

    // console.log('hello')
})
