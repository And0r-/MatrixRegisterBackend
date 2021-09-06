
const express = require('express')
const cors = require('cors');
const app = express()
const PORT = 3001

app.use(cors());
app.use(express.json());

const configs = {
  TestTokenCH: {
    country: "ch",
    channels: ["IOT", "CH"],
    registrationText: "IOT matrix registrierung",
    nameLabel: "Anzeigenamen",
    emailLabel: "Email",
    telLabel: "Handy",
    submitLabel: "Registrieren",
    doneText: "Jea registrierung erfolgreich, du bekommst infos und passwort via Mail... <br />Wir sehen uns in Matrix <3",
  },
  TestTokenD: {
    country: "de",
    channels: ["IOT", "D"],
    registrationText: "IOT matrix registrierung",
    nameLabel: "Anzeigenamen",
    emailLabel: "Email",
    telLabel: "Handy",
    submitLabel: "Registrieren",
    doneText: "Jea registrierung erfolgreich, du bekommst infos und passwort via Mail... <br />Wir sehen uns in Matrix <3",
  },
  TestTokenAT: {
    country: "at",
    channels: ["IOT", "AT"],
    registrationText: "IOT matrix registrierung",
    nameLabel: "Anzeigenamen",
    emailLabel: "Email",
    telLabel: "Handy",
    submitLabel: "Registrieren",
    doneText: "Jea registrierung erfolgreich, du bekommst infos und passwort via Mail... <br />Wir sehen uns in Matrix <3",
  },
  TestTokenUS: {
    country: "us",
    channels: ["IOT", "US"],
    registrationText: "Register for the ultimate IOT matrix chat",
    nameLabel: "Display Name",
    emailLabel: "Email",
    telLabel: "Phone Number",
    submitLabel: "Submit",
    doneText: "Register done :) <br />we send you a Email with a password and instructions<br />See you at Matrix",
  },
}


app.get('/config/:token', (req, res) => {
  if (req.params.token in configs) {
  res.send({token: req.params.token, ...configs[req.params.token]});
  } else {
    res.status(500).send({error: "token not valid"});
  }
});

app.post('/register', function (req, res) {
  let register = {};
  register.answer = "alles ok, user ist registriert, Mail ist versendet";
  res.send(register);
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});

