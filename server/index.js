const users = [
    { username: 'admin', password: 'password' },
    { username: 'user1', password: 'password1' },
    { username: 'user2', password: 'password2' }
  ];
  
  async function handleLogin() {
    // Obtener los valores de los campos de texto del formulario
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Enviar una petición Ajax al servidor con los datos del formulario
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: `username=${username}&password=${password}`
    });
  
    // parsear la respuesta del servidor
    const data = await response.json();
  
    if (data.success) {
      // si la respuesta es exitosa, redirigir al usuario a la página protegida
      window.location.href = 'tabla.html';
    }
    else{
        alert('Incorrect username or password. Please try again')
    }
}


// login.js
function submitForm() {
    // Get the values from the input fields
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
  
    // Create the Ajax request
    var xhr = new XMLHttpRequest();
    xhr.open('POST', '/login', true);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.onload = function () {
      // Handle the response from the server
    };
  
    // Send the request with the username and password
    var data = JSON.stringify({ username: username, password: password });
    xhr.send(data);
  }

  function sendLoginRequest() {
    // Get the values of the username and password fields
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // Create an Ajax request to the Node.js server
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:3000/login', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ username: username, password: password }));

    // Handle the response from the server
    xhr.onload = function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            if (response.success) {
                alert('Login successful!');
            } else {
                alert('Login failed! Please check your username and password.');
            }
        } else {
            alert('An error occurred while processing the request.');
        }
    };
}

// Attach the sendLoginRequest function to the submit button
document.getElementById('loginForm').addEventListener('submit', sendLoginRequest);


  