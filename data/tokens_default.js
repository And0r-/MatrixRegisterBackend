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
    extraSecLabel: "extra security",
    extraSecDesc: 'Wenn ein Hacker deine ID errät, kann er den Anzeigenamen und Provielbild abruffen. Zufällige Zeichen an die ID anhängen?',
    submitLabel: "Registrieren",
    doneText: "Jea registrierung erfolgreich, du bekommst infos und passwort via Mail... <br />Wir sehen uns in Matrix <3",
    
    mailSubject: 'Willkommen beim IOT Matrix',
    mailWelcome: 'Willkommen!',
    mailAcountReadyDesc: 'Dein Konto ist einsatzbereit',
    mailServerLabel: 'Server:',
    mailLoginNameLabel: 'Loginname:',
    mailPasswordLabel: 'Password:',
    mailClientLabel: 'Client:',

    mailWebClientLabel: 'Es gibt auch einen Web-Client:',
    mailWebClientUrl: 'https://element.iot-schweiz.ch',

    mailOtherClientsLabel: 'Oder wähle einen anderen:',

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
    extraSecLabel: "extra security",
    extraSecDesc: 'Wenn ein Hacker deine ID errät, kann er den Anzeigenamen und Provielbild abruffen. Zufällige Zeichen an die ID anhängen?',
    submitLabel: "Registrieren",
    doneText: "Jea registrierung erfolgreich, du bekommst infos und passwort via Mail... <br />Wir sehen uns in Matrix <3",
    
    mailSubject: 'Willkommen beim IOT Matrix',
    mailWelcome: 'Willkommen!',
    mailAcountReadyDesc: 'Dein Konto ist einsatzbereit',
    mailServerLabel: 'Server:',
    mailLoginNameLabel: 'Loginname:',
    mailPasswordLabel: 'Password:',
    mailClientLabel: 'Client:',

    mailWebClientLabel: 'Es gibt auch einen Web-Client:',
    mailWebClientUrl: 'https://element.iot-schweiz.ch',

    mailOtherClientsLabel: 'Oder wähle einen anderen:',
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
    extraSecLabel: "extra security",
    extraSecDesc: 'Wenn ein Hacker deine ID errät, kann er den Anzeigenamen und Provielbild abruffen. Zufällige Zeichen an die ID anhängen?',
    doneText: "Jea registrierung erfolgreich, du bekommst infos und passwort via Mail... <br />Wir sehen uns in Matrix <3",
    
    mailSubject: 'Willkommen beim IOT Matrix',
    mailWelcome: 'Willkommen!',
    mailAcountReadyDesc: 'Dein Konto ist einsatzbereit',
    mailServerLabel: 'Server:',
    mailLoginNameLabel: 'Loginname:',
    mailPasswordLabel: 'Password:',
    mailClientLabel: 'Client:',

    mailWebClientLabel: 'Es gibt auch einen Web-Client:',
    mailWebClientUrl: 'https://element.iot-schweiz.ch',

    mailOtherClientsLabel: 'Oder wähle einen anderen:',
  },
  TestTokenUS: {
    country: "us",
    rooms: [
      "!JoPOfPBJYFmsNbflqE:iot-schweiz.ch", // IOT
      "!xDaWcHVsCAxqAEqikh:iot-schweiz.ch", // US Space
      "!gbLhyHluBezIvVCpOI:iot-schweiz.ch", // US-Test-Room
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
    extraSecLabel: "extra security",
    extraSecDesc: 'Wenn ein Hacker deine ID errät, kann er den Anzeigenamen und Provielbild abruffen. Zufällige Zeichen an die ID anhängen?',
    submitLabel: "Submit",
    doneText: "Register done :) <br />we send you a Email with a password and instructions<br />See you at Matrix",
    
    mailSubject: 'Welcome on IOT Matrix',
    mailWelcome: 'Welcome!',
    mailAcountReadyDesc: 'Your account is ready for use',
    mailServerLabel: 'Server:',
    mailLoginNameLabel: 'Loginname:',
    mailPasswordLabel: 'Password:',
    mailClientLabel: 'Client:',

    mailWebClientLabel: 'There is also a web client:',
    mailWebClientUrl: 'https://element.iot-schweiz.ch',

    mailOtherClientsLabel: 'Or choose one of these clients:',
  },
};

module.exports = tokens