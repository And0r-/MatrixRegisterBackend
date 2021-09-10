// Temporary file, I have to create rest endpoints to set it and store this data in a database, or localstore on persistent place

const tokens = {
    TestTokenCH: {
      country: "ch",
      rooms: [
        "!JoPOfPBJYFmsNbflqE:iot-schweiz.ch", // IOT
        "!DiQNcPqjRCtZQbNnlM:iot-schweiz.ch", //CH
        "!RVPkskcwvvHMACiYPR:iot-schweiz.ch", // CH test raum
        "!SOzxwpDyTCsBHrFHji:iot-schweiz.ch", // German
        "!DkeSnVaQNtWVcCmFmp:iot-schweiz.ch", // Internatinal Projects
        "!VPAKbQvxzoxAzozUrN:iot-schweiz.ch", // Meeting announcements
        "!xJDZdxPrtVSTRHhZHt:iot-schweiz.ch", // World Chat
        "!qxzPEhJiEUzhPyTNYb:iot-schweiz.ch", // Matrix Maintenance
        "!caAqFPzIeEdYGtquLf:iot-schweiz.ch", // World Mails
      ],
      registrationText: "IOT matrix registrierung",
      nameLabel: "Anzeigenamen",
      emailLabel: "Email",
      telLabel: "Handy",
      submitLabel: "Registrieren",
      doneText: "Jea registrierung erfolgreich, du bekommst infos und passwort via Mail... <br />Wir sehen uns in Matrix <3",
      mailBodyHtml: '<h1>User is created</h1>Hey %DISPLAY_NAME%<br>you can use one of this clients....<br>...<br>...<br>...<br><br>or use matrix.iot-schweiz.ch<br><br>user: %LOGIN_NAME%<br>pw: %PW%',
      mailSubject: 'IOT Matrix login data',
    },
    TestTokenDE: {
      country: "de",
      rooms: [
        "!JoPOfPBJYFmsNbflqE:iot-schweiz.ch", // IOT
        "!KrEzIiFMEGnrdOaauN:iot-schweiz.ch", //DE
        "!dXPYjnDzWXdUCWavld:iot-schweiz.ch", // DE test raum
        "!SOzxwpDyTCsBHrFHji:iot-schweiz.ch", // German
        "!DkeSnVaQNtWVcCmFmp:iot-schweiz.ch", // Internatinal Projects
        "!VPAKbQvxzoxAzozUrN:iot-schweiz.ch", // Meeting announcements
        "!xJDZdxPrtVSTRHhZHt:iot-schweiz.ch", // World Chat
        "!qxzPEhJiEUzhPyTNYb:iot-schweiz.ch", // Matrix Maintenance
        "!caAqFPzIeEdYGtquLf:iot-schweiz.ch", // World Mails
      ],
      registrationText: "IOT matrix registrierung",
      nameLabel: "Anzeigenamen",
      emailLabel: "Email",
      telLabel: "Handy",
      submitLabel: "Registrieren",
      doneText: "Jea registrierung erfolgreich, du bekommst infos und passwort via Mail... <br />Wir sehen uns in Matrix <3",
      mailBodyHtml: '<h1>User is created</h1>Hey %DISPLAY_NAME%<br>you can use one of this clients....<br>...<br>...<br>...<br><br>or use matrix.iot-schweiz.ch<br><br>user: %LOGIN_NAME%<br>pw: %PW%',
      mailSubject: 'IOT Matrix login data',
    },
    TestTokenAT: {
      country: "at",
      rooms: [
        "!JoPOfPBJYFmsNbflqE:iot-schweiz.ch", // IOT
        "!fRxdpedTZwovugGXpU:iot-schweiz.ch", //AT
        "!VijvfDLvAgWsjMnHft:iot-schweiz.ch", // AT test raum
        "!SOzxwpDyTCsBHrFHji:iot-schweiz.ch", // German
        "!DkeSnVaQNtWVcCmFmp:iot-schweiz.ch", // Internatinal Projects
        "!VPAKbQvxzoxAzozUrN:iot-schweiz.ch", // Meeting announcements
        "!xJDZdxPrtVSTRHhZHt:iot-schweiz.ch", // World Chat
        "!qxzPEhJiEUzhPyTNYb:iot-schweiz.ch", // Matrix Maintenance
        "!caAqFPzIeEdYGtquLf:iot-schweiz.ch", // World Mails
      ],
      registrationText: "IOT matrix registrierung",
      nameLabel: "Anzeigenamen",
      emailLabel: "Email",
      telLabel: "Handy",
      submitLabel: "Registrieren",
      doneText: "Jea registrierung erfolgreich, du bekommst infos und passwort via Mail... <br />Wir sehen uns in Matrix <3",
      mailBodyHtml: '<h1>User is created</h1>Hey %DISPLAY_NAME%<br>you can use one of this clients....<br>...<br>...<br>...<br><br>or use matrix.iot-schweiz.ch<br><br>user: %LOGIN_NAME%<br>pw: %PW%',
      mailSubject: 'IOT Matrix login data',
    },
    TestTokenUS: {
      country: "us",
      rooms: [
        "!JoPOfPBJYFmsNbflqE:iot-schweiz.ch", // IOT
        "!DkeSnVaQNtWVcCmFmp:iot-schweiz.ch", // Internatinal Projects
        "!VPAKbQvxzoxAzozUrN:iot-schweiz.ch", // Meeting announcements
        "!xJDZdxPrtVSTRHhZHt:iot-schweiz.ch", // World Chat
        "!qxzPEhJiEUzhPyTNYb:iot-schweiz.ch", // Matrix Maintenance
        "!caAqFPzIeEdYGtquLf:iot-schweiz.ch", // World Mails
      ],
      registrationText: "Register for the ultimate IOT matrix chat",
      nameLabel: "Display Name",
      emailLabel: "Email",
      telLabel: "Phone Number",
      submitLabel: "Submit",
      doneText: "Register done :) <br />we send you a Email with a password and instructions<br />See you at Matrix",
      mailBodyHtml: '<h1>User is created</h1>Hey %DISPLAY_NAME%<br>you can use one of this clients....<br>...<br>...<br>...<br><br>or use matrix.iot-schweiz.ch<br><br>user: %LOGIN_NAME%<br>pw: %PW%',
      mailSubject: 'IOT Matrix login data',
    },
  };

  module.exports = tokens