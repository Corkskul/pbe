const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

const users = [
    { username: 'admin', password: 'password' },
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' },
    { username: 'diego', password: 'qwerty' }
  ];

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

app.get('/', function(request, response) {
	console.log('Default Page');
	response.sendFile(path.join(__dirname + '/login.html'));
	console.log("Default Page - Session logged in: " + request.session.loggedin);
	if (request.session.loggedin == true) {
		response.redirect('/home');
	} else {
		// response.send('Please enter Username and Password!');
	};

});
function validate(x, y) {
	var valid = false;
	console.log("Validating " + x + ":" + y);
	for (var i=0; i <users.length; i++) {
		console.log("Checkin " + users[i].username + ":" + users[i].password);
		if ((x == users[i].username) && (y == users[i].password)) {
			valid = true;
			break;  
		}
	}
	return valid;
}

app.post('/login', function(request, response) {
	console.log('Login Page');
	let username = request.body.username;
	let password = request.body.password;

	console.log("Form Username: " + username);
	console.log("Form Password: " + password);
	// request.session.loggedin = true;
	console.log("Login Page - Session logged in: " + request.session.loggedin);

	// Ensure the input fields exists and are not empty
	if (username && password) {
		var valid = false;
		valid = validate(username, password);
		if(valid) {
			request.session.loggedin = true;
			request.session.username = username;
			response.redirect('/home');
			console.log("Session logged in: " + request.session.loggedin);
			console.log("Valid credentials for user: " + username);
		}
		else {
			console.log("Invalid credentials for user: " + username);
			response.send('Please enter Username and Password!');
			response.end();
		}
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	console.log('Home Page');
	console.log("Session logged in: " + request.session.loggedin);
	if (request.session.loggedin == true) {
		response.sendFile(path.join(__dirname + '/table.html'));
	}
	else {
		response.send('Not valid session. Please Login.');
	}
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
