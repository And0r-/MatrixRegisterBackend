const axios = require('axios');
var generator = require('generate-password');
const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require("nodemailer");
var app_config = require('./app_config');
var tokens = require('./data/tokens');

class User {
    constructor(displayname, pw, email, phone, post_id, usertoken) {
        this.displayname = displayname;
        this.pw = pw;
        this.email = email;
        this.post_id = post_id || "";
        this.phone = phone || undefined;

        this.access_token;
        this.id;
        this.login_name;
        this.token = tokens[usertoken]
    }

    async createUser() {

        await this._botLogin();

        await this._getAvailableId(this.displayname, 0);

        await this._sendUser2Matrix();

        await sleep(4000);

        this._send3Pid2Matrix();
        this._sendMail();
        this._joinToRooms();
    }


    async _getAvailableId(displayname, count) {
        // when user exist, add a counter starting on "2"
        if (count === 1) {count++}
        this.login_name = (displayname+this.post_id).replace(/[^a-zA-Z0-9]/g, "") + (count || "");

        // Login Name and ID minimun need one alphabetic letter
        if (!/[a-zA-Z]/.test(this.login_name)) {this.login_name = "a" + this.login_name}

        this.id = '@' + this.login_name.toLowerCase() + ':iot-schweiz.ch';
        await axios.get(app_config.matrixHost+'_synapse/admin/v2/users/' + this.id,
          {
            headers: {
              'Authorization': 'Bearer ' + this.access_token
            },
            validateStatus: function (status) {
              return status === 404 || status === 200; // Reject only if the status code is greater than or equal to 500
            }
          })
          .then(async res => {
            if (res.status === 404) {
              console.log("final id: " + this.id);
            } else if (res.status === 200) {
              console.log("id already exist, add counter");
              await this._getAvailableId(displayname, count + 1);
            }
          }
          )
          .catch(error => {
            console.log("get id error..." + error)
            return undefined;
          });
      }

    async _botLogin() {

        // set request url
        let url = app_config.matrixHost+'_matrix/client/r0/login';

        // set axios request config
        let config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // set axios request body
        let body = {
            "identifier": {
                "type": "m.id.user",
                "user": app_config.matrixBotUser,
            },
            "password": process.env.MATRIX_BOT_PASSWORD,
            "type": "m.login.password"
        }

        // fier first create request 
        await axios.post(url, body, config)
            .then(res => {
                console.log(res.data);
                this.access_token = res.data.access_token
            })
            .catch(error => {
                console.log("error..." + error)
                console.log(error.response.data);
            });
    }

    async _sendUser2Matrix() {
        // set request url
        let url = app_config.matrixHost+'_synapse/admin/v2/users/' + this.id;

        // set axios request config
        let config = {
            headers: {
                'Authorization': 'Bearer ' + this.access_token,
                'Content-Type': 'application/json'
            }
        }

        console.log(config)

        // set axios request body
        let body = {
            "password": this.pw,
            "displayname": this.displayname,
            "threepids": [],
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
        let url = app_config.matrixHost+'_synapse/admin/v2/users/' + this.id;

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
            subject: this.token.mailSubject,
            html: this.token.mailBodyHtml.replace("%LOGIN_NAME%", this.login_name).replace("%DISPLAY_NAME%", this.displayname).replace("%PW%", this.pw)
        });
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

            let url = app_config.matrixHost+'_synapse/admin/v1/join/' + room;

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