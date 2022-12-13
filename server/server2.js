const express = require('express');
const app = express();

app.get('/login', (req, res) => {
  const { username, password } = req.query;

  if (username === 'admin' && password === '1234') {
    res.send('Login successful!');
    console.log(username, password);
  } else {
    res.send('Login failed.');
    console.log(username, password);
  }
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });