const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// Usamos el body-parser para poder leer los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// Definimos la ruta para el formulario de login
app.post('/login', (req, res) => {
  // obtenemos los datos del formulario
  const { username, password } = req.body;
    console.log(username, password);

  // comprobamos si el usuario existe en la base de datos
  if (username === 'admin' && password === 'password') {
    // si las credenciales son válidas, enviamos un mensaje de éxito al cliente
    res.send({ success: true });
    console.log('enviado bueno');
  } else {
    // si las credenciales no son válidas, enviamos un mensaje de error al cliente
    res.send({ success: false, error: 'Invalid username or password' });
    console.log('enviado malo');
  }
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});