const express = require('express');
const socketio = require('socket.io');
const userModel = require('./model/userModel');
const jsonwebtoken = require('jsonwebtoken');
const crypto = require('crypto');
const cookiePraser = require('cookie-parser');
const bcrypt = require('bcrypt');
const app = express();
let rsocket;
let rusr = "";
const port = process.env.PORT || 80;
// var bodyParser = require('body-parser')


// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())
app.use(express.urlencoded())
app.use(cookiePraser())
// var socketu = {};
let socketu = {};
var globaluser = "";

// app.use(express.json());
app.set('view engine', 'pug');

app.set('views', 'template');
app.use(express.static('public'));
// const port = 3000;
// app.use(express.bodyParser())
const server = app.listen(port);

app.get(['/', '/login'], (req, res) => {

    res.render('login.pug')
})

app.get('/register', (req, res) => {

    res.render("index");
})
// app.use(express.json())
app.post('/api/user/signup', async (req, res) => {
    let obj = req.body;
    console.log(obj)
    let username = obj.username;
    let dbdata = await userModel.findOne({ 'username': username });
    if (dbdata) {
        res.send("true");
    }
    else {
        await userModel.create(obj);
        console.log(obj)
        res.send("false");
    }

})
app.post('/api/user/signIn', async (req, res) => {
    // let data = req.body;
    try {
        var data = req.body;
        if (!data.email || !data.password) {

            res.end('Information Not Available');
        }
        console.log("hello")
        var dbdata = await userModel.findOne({
            email: data.email
        });

        console.log("hello")
        if (!dbdata) {
            res.send('pwnwvpwvw')
            res.end("User Not Found");
        }

        console.log("hello")
        var ans = await bcrypt.compare(data.password, dbdata.password);
        if (!ans) {
            res.end("Password Incorrect");
        }
        console.log("hello")
        var token = jsonwebtoken.sign({ id: dbdata._id }, "Secret Key", { expiresIn: "1h" });
        globaluser = dbdata.username;
        console.log("hello")
        res.cookie("jwt", token, { "httpOnly": true });

        res.status(201).json({
            status: "Logged In",

        })
    }
    catch (err) {
        // console.log(err)
        res.status(404).json({
            err: err
        })
    }


})
// app.post('/index', async (req, res) => {

//     // console.log('get')
//     // console.log(req.body);
//     username = req.body.u;
//     let dbdata = await userModel.findOne({ 'username': username });
//     if (!dbdata) {
//         res.send('false')
//     }
//     else {
//         res.send('true')
//     }
//     // console.log(username);
//     // console.log(socketu);
//     // if (socketu[username]) {
//     //     res.send('true');
//     // } else {
//     //     res.send('false');
//     // }

// })
app.get('/user', function (req, res) {
    console.log(req.cookies)
    if (req.cookies.jwt) {
        res.render('user.pug')
    }
    else {
        res.status(404).json({
            status: "Not Authenticated"
        })
    }
})

const socketserver = socketio(server);
socketserver.on('connection', async function (socket) {

    console.log('user connected')
    socket.on('username', async function () {
        try {
            // let dbdata = await userModel.findOne({ "username": globaluser });
            // console.log(dbdata)
            socket.username = globaluser;
            console.log('Socket' + socket);
            // dbdata.socket = socket;
            // console.log(dbdata);
            socketu[globaluser] = socket;
            console.log(socketu)
            socket.emit('set-username', globaluser)

            // console.log(id);
            // await dbdata.save();
            // let data = await userModel.findOne({ "username": globaluser })
            // console.log(data)

        }
        catch (err) {
            console.log('Error')
            console.log(err)
        }
        // if (socketu[username]) {
        //     socket.emit('exists');
        //     // console.log('exist')
        // } else {
        //     // console.log("socket")

        //     socketu[username] = socket;
        //     socketu[username].emit('set-username', username)


        // }


        // console.log(username);
    });

    socket.on('message', async function (msg, usrnm) {
        // console.log(msg);
        // console.log(usrnm)
        // console.log(msg);
        // msg = sender + msg;
        // console.log(socketu[usrnm])
        if (rusr == usrnm) {
            rsocket.emit('showmsg', msg);
        }
        else {
            console.log(usrnm);
            // let db = await userModel.findOne({ 'username': usrnm });

            rsocket = socketu[usrnm];
            // console.log(db)
            // console.log(db.socket)
            rsocket.emit('showmsg', msg);
        }
        // console.log(socketu[usrnm])
        // if (socketu[usrnm]) {
        //     // console.log(msg)
        //     socketu[usrnm].emit('showmsg', msg);
        // }
    })
})
