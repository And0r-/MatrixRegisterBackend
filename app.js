
const express = require('express')
const cors = require('cors');
const app = express()
const PORT = 3001

const axios = require('axios');
var generator = require('generate-password');
const { User } = require('./user');
var tokens = require('./data/tokens');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());




app.get('/config/:token', (req, res) => {
  if (req.params.token in tokens) {
    res.send({ token: req.params.token, ...tokens[req.params.token] });
  } else {
    res.status(500).send({ error: "token not valid" });
  }
});

app.post('/register', async (req, res) => {
  // Check is token valid
  if (req.body.token in tokens) {

    let password = generator.generate({
      length: 10,
      numbers: true
    });

    let user = new User(req.body.name, password, req.body.email, req.body.phone, req.body.twofa, req.body.token);

    user.createUser();
    res.send({ answer: "alles ok, user ist registriert, Mail ist versendet" });

  } else {
    res.status(500).send({ error: "token not valid" });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});
