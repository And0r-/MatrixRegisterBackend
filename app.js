
const express = require('express')
const cors = require('cors');
const app = express()
const PORT = 3001

const axios = require('axios');
var generator = require('generate-password');
const { User } = require('./user')
const dotenv = require('dotenv');
dotenv.config();

app.use(cors());
app.use(express.json());

const configs = {
  TestTokenCH: {
    country: "ch",
    rooms: [
      "!JoPOfPBJYFmsNbflqE:iot-schweiz.ch", // IOT
      "!DiQNcPqjRCtZQbNnlM:iot-schweiz.ch", //CH
      "!RVPkskcwvvHMACiYPR:iot-schweiz.ch", // CH test raum
    ],
    registrationText: "IOT matrix registrierung",
    nameLabel: "Anzeigenamen",
    emailLabel: "Email",
    telLabel: "Handy",
    submitLabel: "Registrieren",
    doneText: "Jea registrierung erfolgreich, du bekommst infos und passwort via Mail... <br />Wir sehen uns in Matrix <3",
  },
  TestTokenDE: {
    country: "de",
    rooms: [
      "!JoPOfPBJYFmsNbflqE:iot-schweiz.ch", // IOT
      "!KrEzIiFMEGnrdOaauN:iot-schweiz.ch", //DE
      "!dXPYjnDzWXdUCWavld:iot-schweiz.ch", // DE test raum
    ],
    registrationText: "IOT matrix registrierung",
    nameLabel: "Anzeigenamen",
    emailLabel: "Email",
    telLabel: "Handy",
    submitLabel: "Registrieren",
    doneText: "Jea registrierung erfolgreich, du bekommst infos und passwort via Mail... <br />Wir sehen uns in Matrix <3",
  },
  TestTokenAT: {
    country: "at",
    rooms: [
      "!JoPOfPBJYFmsNbflqE:iot-schweiz.ch", // IOT
      "!fRxdpedTZwovugGXpU:iot-schweiz.ch", //AT
      "!VijvfDLvAgWsjMnHft:iot-schweiz.ch", // AT test raum
    ],
    registrationText: "IOT matrix registrierung",
    nameLabel: "Anzeigenamen",
    emailLabel: "Email",
    telLabel: "Handy",
    submitLabel: "Registrieren",
    doneText: "Jea registrierung erfolgreich, du bekommst infos und passwort via Mail... <br />Wir sehen uns in Matrix <3",
  },
  TestTokenUS: {
    country: "us",
    rooms: [
      "!JoPOfPBJYFmsNbflqE:iot-schweiz.ch", // IOT
    ],
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
    res.send({ token: req.params.token, ...configs[req.params.token] });
  } else {
    res.status(500).send({ error: "token not valid" });
  }
});

app.post('/register', async (req, res) => {
  // Check is token valid
  if (req.body.token in configs) {

    let id = req.body.name.toLowerCase().replace(/[^a-z0-9 ]/g, "");
    id = await getAvailableId(id, 0);

    let password = generator.generate({
      length: 10,
      numbers: true
    });

    let user = new User(id, password, req.body.name, req.body.email, req.body.phone);
    user.createUser();

    await user.joinToRooms(configs[req.body.token].rooms);

    


    res.send({ answer: "alles ok, user ist registriert, Mail ist versendet" });


  } else {
    res.status(500).send({ error: "token not valid" });
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
});



async function getAvailableId(id_tag, count) {
  let id = '@' + id_tag + "" + (count || "") + ':iot-schweiz.ch';
  return await axios.get('https://matrix.iot-schweiz.ch/_synapse/admin/v2/users/' + id,
    {
      headers: {
        'Authorization': 'Bearer '+process.env.MATRIX_CREATE_TOKEN
      },
      validateStatus: function (status) {
        return status === 404 || status === 200; // Reject only if the status code is greater than or equal to 500
      }
    })
    .then(async res => {
      if (res.status === 404) {
        console.log("return " + id);
        return id
      } else if (res.status === 200) {
        console.log("id already exist, add counter");
        return await getAvailableId(id_tag, count + 1);
      }
    }
    )
    .catch(error => {
      console.log("error..." + error)
      return undefined;

    });
}