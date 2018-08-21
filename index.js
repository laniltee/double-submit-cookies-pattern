const express = require('express');
const bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');
const uuidv4 = require('uuid/v4');
const cookieParser = require('cookie-parser');
const nocache = require('nocache');

const app = express();

const PORT = 3001;

// Applying middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(nocache());

// Views
app.use(express.static('views'));

// Server Startup
app.listen(PORT, () => {
    console.log(`Double Submit Cookies Pattern Demo Started On ${PORT}`);
});

// Login Page Load
app.get('/', (req, res) => {

    const sessionID = req.cookies['session-id'];
    const cookieToken = req.cookies['csrf-token'];

    if (sessionID && cookieToken) {
        console.log("Login: Some Session ID and CSRF Token Found !");
        res.sendFile('views/form.html', {root: __dirname});
    } else {
        console.log("Login: No Session ID and CSRF Token Found !");
        res.sendFile('views/login.html', {root: __dirname});
    }
});

// Validate Credentials
app.post('/home', (req, res) => {

    const username = req.body.inputUsername;
    const password = req.body.inputPassword;

    const sessionID = req.cookies['session-id'];
    const cookieToken = req.cookies['csrf-token'];

    if (username === 'root' && password === 'root') {

        console.log("Home: Logged with valid credentials");

        // Generating Session ID and Token
        const SESSION_ID = uuidv1();
        const CSRF_TOKEN = uuidv4();

        if (!sessionID && !cookieToken) {
            console.log(`Generated Session ID: ${SESSION_ID}, CSRF Token: ${CSRF_TOKEN}`);
            // Setting Cookie on Header
            res.setHeader('Set-Cookie', [`session-id=${SESSION_ID}`, `time=${Date.now()}`, `csrf-token=${CSRF_TOKEN}`]);
        } else {
            console.log('POST /home Some Session ID and CSRF Token Found')
        }


        res.sendFile('views/form.html', {root: __dirname});
    } else {
        const error = {status: 401, message: 'Invalid Credentials'};
        res.sendFile('views/form-error.html', {root: __dirname});
    }

});

// Submit Form Data
app.post('/posts', (req, res) => {

    const inputTitle = req.body.inputTitle;
    const inputContent = req.body.inputContent;

    const inputToken = req.body.inputToken;
    const cookieToken = req.cookies['csrf-token'];

    // Checking if Cookie Token matches CSRF Token Submitted
    if (cookieToken === inputToken) {
        console.log("Post Content: Valid CSRF Tokens Received !");
        res.sendFile('views/form-success.html', {root: __dirname});
    } else {
        console.error("Post Content: No Valid CSRF Tokens Received ! !");
        res.sendFile('views/form-error.html', {root: __dirname});
    }

});

// Signs out and clear the session ID with CSRF token
app.post('/logout', (req, res) => {

    const sessionID = req.cookies['session-id'];

    console.log(sessionID + ': Removed');

    res.clearCookie("session-id");
    res.clearCookie("time");
    res.clearCookie("csrf-token");

    res.sendFile('views/login.html', {root: __dirname});
});

// When user exciplity load home page URL
app.get('/home', (req, res) => {

    const sessionID = req.cookies['session-id'];
    const cookieToken = req.cookies['csrf-token'];

    if (sessionID && cookieToken) {
        console.log("GET /home: Some Session ID and CSRF Token Found !");
        res.sendFile('views/form.html', {root: __dirname});
    } else {
        console.log("GET /home: No Session ID and CSRF Token Found !");
        res.sendFile('views/login.html', {root: __dirname});
    }

});

// When user exciplity load logout page URL
app.get('/logout', (req, res) => {
    res.redirect('/');
});

// respond with "hello world" when a GET request is test route
app.get('/health', function (req, res) {
    res.send('Welcome to Double Submit Cookies Pattern Demo !')
});