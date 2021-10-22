
const express = require('express')
const cors = require('cors');
const app = express()
const PORT = 3001

const axios = require('axios');
var session = require('express-session');
var Keycloak = require('keycloak-connect');


var generator = require('generate-password');
const { User } = require('./user');
var tokens = require('./data/tokens');
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

var memoryStore = new session.MemoryStore();

app.use(session({ secret: 'some secret', resave: false, saveUninitialized: true, store: memoryStore }));

var keycloak = new Keycloak({
  store: memoryStore
});

app.use(keycloak.middleware());

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

app.get('/test', keycloak.protect(), function (req, res) {

  res.send([{
    titel: "Matrix Chat", text: `A IOT int
  ern Chat only fo
  r Members.<br> You can use a lot different clients. I recommend element. It is available for Desktop and Phone. There is also a webclient: https://element.iot-schweiz.ch<br>To Login, you have to change the server to https://matrix.iot-schweiz.ch`, url: ["https://matrix.iot-schweiz.ch"], video: "", contacts: ["Bill", "John"]
  }, { titel: "Matrix Chat", text: "A IOT intern Chat only for Members.<br> You can use a lot different clients. I recommend element. It is available for Desktop and Phone. There is also a webclient: https://element.iot-schweiz.ch<br>To Login, you have to change the server to https://matrix.iot-schweiz.ch", url: "https://matrix.iot-schweiz.ch", video: "https://www.youtube.com/embed/tgbNymZ7vqY", contacts: ["Bill", "John"] }]);
  // console.log(req.kauth.grant);
});

// title    String
// text     String
// url      String
// video    String

app.post('/test2', keycloak.protect(), async (req, res) => {
  const result = await prisma.project.create({
    data: req.body
  });
  res.send(result);
});

app.get('/test2', keycloak.protect(), async (req, res) => {
  const allProjects = await prisma.project.findMany({
    include: {
      contact: true,
    },

  });
  res.send(allProjects);
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});
