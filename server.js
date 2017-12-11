//TODO clean up - const etc.

'use strict'

const fs = require('fs');
const https = require('https');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const Express = require('express');
const Heater = require('./heater.js');
const UserUtils = require('./userUtils.js');
const userUtils = new UserUtils();
const app = Express();

const configObj = require('./config.js');

const heater = new Heater();

app.set('view engine', 'ejs');
app.use(bodyParser.text());
app.use('/static', Express.static('public'));
app.use(session({
	secret: configObj.sessionSecret,
	resave: false,
	saveUninitialized: true, 
	cookie: {
		httpOnly: false,
		secure: true,
		maxAge: null
	}
}));

function checkUserIsAuthenticated(req, res, next) {
	console.log("checking user authentication for route ", req.path);

	if(userUtils.checkSession(req)){
		next();
	}else{
		res.send(403, 'You must be logged in!');
	}
}

//START routes
//TODO could move to a routes.js

app.get('/', function (req, res) {
	if(userUtils.checkSession(req)){
		res.redirect('/index');
	}else{
		res.render('login', {
			user: undefined
		});
	}
});

//POST for login
app.post('/', function (req, res) {
	if(userUtils.checkUserPassInput(req)){
		res.send(200, 'OK, will now redirect');
	}else{
		//
		res.send(401, 'Invalid credentials');
	}
});

app.get('/logout', function(req, res){
	req.session.destroy();

	res.render('login', {
		user: undefined
	});
});

app.get('/index', checkUserIsAuthenticated, function(req, res) {
	
	const status = heater.getStatus();

	res.render('index', {
		user: {
			name: req.session.user
		},
		heaterStatusObj : {
			status: status
		}
	});
});

//READ Status
app.get('/status', checkUserIsAuthenticated, function(req, res){
	res.json(heater.getStatus());
});

//WRITE Status
app.post('/status', checkUserIsAuthenticated, function(req, res){
	const reqBody = JSON.parse(req.body);
	heater.setStatus(reqBody.status, reqBody.duration);
	res.json(heater.getStatus());
});

//GET reaming time
app.get('/remainingTime', checkUserIsAuthenticated, function(req, res){
	res.json(heater.getRemainingTime());
});



//END routes

https.createServer({
	key: fs.readFileSync('ssl/key.pem'),
	cert: fs.readFileSync('ssl/cert.pem')
}, app).listen(3000, "0.0.0.0");