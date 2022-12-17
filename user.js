const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs')
const path = require('path')
const nodemailer = require("nodemailer");
var app_config = require('./app_config');
var tokens = require('./data/tokens');

const mailBodyHtml = fs.readFileSync(path.resolve(__dirname, 'mail/welcome.html'), 'utf8')

class User {
    constructor(displayname, pw, email, phone, twofa, usertoken) {
        this.displayname = displayname;
        this.pw = pw;
        this.email = email;
        this.twofa = twofa || "email";
        this.phone = phone || undefined;

        this.access_token;
        this.id;
        this.login_name;
        this.token = tokens[usertoken]
    }

    async createUser() {

        await this._botLogin();

        this.login_name = this.email;

        await this._sendUser2Matrix();

        await this._getUserId();

        await this._setUserPassword();

        await sleep(4000);

        // this._send3Pid2Matrix();
        this._sendMail();
        this._sendAdminMail();
        // this._joinToRooms();
    }

    // @TODO use keycloak admin client!
    async _botLogin() {

        // set request url
        let url = process.env.KEYCLOAK_BASE_URL + '/realms/master/protocol/openid-connect/token';

        // set axios request config
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        const params = new URLSearchParams()
        params.append('username', process.env.KEYCLOAK_BOT_NAME)
        params.append('password', process.env.KEYCLOAK_BOT_PASSWORD)
        params.append('grant_type', 'password')
        params.append('client_id', 'admin-cli')


        // fier first create request 
        await axios.post(url, params, config)
            .then(res => {
                // console.log(res.data);
                this.access_token = res.data.access_token
            })
            .catch(error => {
                console.log("error..." + error)
                console.log(error.response.data);
            });
    }

    async _sendUser2Matrix() {

        // set request url
        let url = process.env.KEYCLOAK_BASE_URL + '/admin/realms/IOT/users';

        // set axios request config
        let config = {
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            }
        }

        // set axios request body
        let body = {
            "email": this.email,
            "enabled": "true",
            "firstName": this.displayname,
            "emailVerified": "true",
            "groups": this.token.groups
        }

        console.log(this.twofa);
        if (this.twofa === "authenticator") {
            body.requiredActions = ["CONFIGURE_TOTP"]
        }

        // fier first create request 
        await axios.post(url, body, config)
            .then(res => {
                // console.log(res.data); 
            })
            .catch(error => {
                console.log("error..." + error)
                console.log(error.response.data);
            });
    }


    async _getUserId() {

        // set request url
        let url = process.env.KEYCLOAK_BASE_URL + '/admin/realms/IOT/users?email=' + encodeURIComponent(this.email);

        // set axios request config
        let config = {
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            }
        }

        // fier first create request 
        await axios.get(url, config)
            .then(res => {
                if (res.data[0] && res.data[0].id) {
                    this.id = res.data[0].id
                }
            })
            .catch(error => {
                console.log("error..." + error)
                console.log(error.response.data);
            });
    }


    async _setUserPassword() {
        // set request url
        let url = process.env.KEYCLOAK_BASE_URL + '/admin/realms/IOT/users/' + this.id + '/reset-password';

        // set axios request config
        let config = {
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            }
        }

        // set axios request body
        let body = {
            // "password": this.pw,
            "type": "password",
            "value": this.pw
        }


        // fier first create request 
        await axios.put(url, body, config)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.log("error..." + error)
                console.log(error.response.data);
            });
    }


    _send3Pid2Matrix() {
        // set request url
        let url = app_config.matrixHost + '_synapse/admin/v2/users/' + this.id;

        // set axios request config
        let config = {
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            }
        }

        let body2 = { threepids: [] };

        // add phone to body
        if (this.phone) {
            body2.threepids.push(
                {
                    "medium": "msisdn",
                    "address": this.phone
                }
            )
        }

        // add mail to body
        if (this.email) {
            body2.threepids.push(
                {
                    "medium": "email",
                    "address": this.email
                }
            )
        }

        // add 3pid data
        axios.put(url, body2, config)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.log("error..." + error)
                console.log(error.response.data);
            });
    }


    _sendMail() {
        // create transporter object with smtp server details
        const transporter = nodemailer.createTransport({
            host: app_config.mailHost,
            port: app_config.mailPort,
            auth: {
                user: app_config.mailUser,
                pass: process.env.MAIL_PASSWORD
            }
        });

        // send email
        transporter.sendMail({
            from: app_config.mailFrom,
            to: this.email,
            subject: this.token.mailSubject
                .replace("%DISPLAY_NAME%", this.displayname),
            html: mailBodyHtml

                .replace(/\%LOGIN_NAME\%/g, this.login_name)
                .replace("%DISPLAY_NAME%", this.displayname)
                .replace("%PW%", this.pw)

                .replace("%WELCOME%", this.token.mailWelcome)
                .replace("%ACCOUNT_READY%", this.token.mailAcountReadyDesc)
                .replace("%LOGINNAME_LABEL%", this.token.mailLoginNameLabel)
                .replace("%PASSWORD_LABEL%", this.token.mailPasswordLabel)
                .replace(/\%WEB_PROJECT_URL\%/g, this.token.mailProjectUrl)
                .replace("%WEB_PROJECT_LABEL%", this.token.mailProjectLabel)
                .replace(/\%WEB_ACCOUNT_MANAGE_URL\%/g, this.token.mailAccountManageUrl)
                .replace("%WEB_ACCOUNT_MANAGE_LABEL%", this.token.mailAccountManageLabel),
            text: `${this.token.mailWelcome} ${this.displaynam}
${this.token.mailAcountReadyDesc}
${this.token.mailLoginNameLabel} ${this.login_name}
${this.token.mailPasswordLabel} ${this.pw}
${this.token.mailProjectLabel} ${this.token.mailProjectUrl}

ps: you fucking bastard read this mail in text format and ignore my beatiful html mail.
                `,
            attachments: [{
                filename: 'logo.jpg',
                path: __dirname + "/mail/images/logo.jpg",
                cid: 'unique@logo.iot'
            }]
        });
    }

    _sendAdminMail() {
        if (this.token.registrationNotifications) {
            // create transporter object with smtp server details
            const transporter = nodemailer.createTransport({
                host: app_config.mailHost,
                port: app_config.mailPort,
                auth: {
                    user: app_config.mailUser,
                    pass: process.env.MAIL_PASSWORD
                }
            });

            // send email
            transporter.sendMail({
                from: app_config.mailFrom,
                to: this.token.registrationNotifications.join(),
                subject: `New IOT Cyber User ${this.displayname}`,
                text: `New IOT Cyber User is registrated:
Name: ${this.displayname}
Mail: ${this.email}
2FA: ${this.twofa}`
            });
        }
    }


    async _joinToRooms() {
        await sleep(5000);

        // set axios request config
        let config = {
            headers: {
                'Authorization': 'Bearer ' + this.access_token
            }
        }
        let body = { user_id: this.id }
        console.log(body);

        this.token.rooms.forEach(async function (room) {

            let url = app_config.matrixHost + '_synapse/admin/v1/join/' + room;

            await axios.post(url, body, config)
                .then(res => {
                    console.log(res.data);
                })
                .catch(error => {
                    console.log("error..." + error)
                    console.log(error.response.data);
                });
        })
    }

}


function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

module.exports = { User }