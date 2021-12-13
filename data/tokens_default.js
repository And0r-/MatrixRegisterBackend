// Temporary file, I have to create rest endpoints to set it and store this data in a database, or localstore on persistent place

const Translations = {
  "de": {
    registrationText: "IOT Cyber registrierung",
    nameLabel: "Anzeigenamen",
    emailLabel: "Email",
    submitLabel: "Registrieren",
    doneText: "Jea registrierung erfolgreich, du bekommst infos und passwort via Mail... <br />Wir sehen uns im Cyber <3",

    mailSubject: 'Willkommen beim IOT Cyber, %DISPLAY_NAME%',
    mailWelcome: 'Willkommen!',
    mailAcountReadyDesc: 'Dein Konto ist einsatzbereit',
    mailLoginNameLabel: 'Benutzername:',
    mailPasswordLabel: 'Passwort:',
    mailProjectUrl: 'https://tools.iot-schweiz.ch',
    mailProjectLabel: 'IOT Projekte:',
    mailAccountManageUrl: 'https://keycloak.iot-schweiz.ch',
    mailAccountManageLabel: 'IOT Cyber Account bearbeiten'
  },


  "en": {
    registrationText: "IOT Cyber registration",
    nameLabel: "Display Name",
    emailLabel: "Email",
    submitLabel: "Submit",
    doneText: "Register done :) <br />we send you a Email with a password and instructions<br />See you at Cyber",

    mailSubject: 'Welcome to IOT Cyber, %DISPLAY_NAME%',
    mailWelcome: 'Welcome!',
    mailAcountReadyDesc: 'Your account is ready for use',
    mailLoginNameLabel: 'Username:',
    mailPasswordLabel: 'Password:',
    mailProjectUrl: 'https://tools.iot-schweiz.ch',
    mailProjectLabel: 'IOT Projects:',
    mailAccountManageUrl: 'https://keycloak.iot-schweiz.ch/auth/realms/IOT/account/',
    mailAccountManageLabel: 'Manage IOT Cyber Account:'
  }
}


const tokens = {
  TestTokenCH: {
    groups: [
      "/IOT-Member/CH",
    ],
    ...Translations.de
  },
  TestTokenDE: {
    groups: [
      "/IOT-Member/DE",
    ],
    ...Translations.de
  },
  TestTokenAT: {
    groups: [
      "/IOT-Member/AT",
    ],
    ...Translations.de
  },
  TestTokenUS: {
    groups: [
      "/IOT-Member/US",
    ],
    ...Translations.en
  },
};

module.exports = tokens