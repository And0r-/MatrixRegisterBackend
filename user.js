const axios = require('axios');
var generator = require('generate-password');
const dotenv = require('dotenv');
dotenv.config();
const nodemailer = require("nodemailer");

class User {
    constructor(id, pw, name, email, phone) {
        this.id = id;
        this.pw = pw;
        this.name = name;
        this.email = email;
        this.phone = phone || undefined;
    }

    async createUser() {

        await this._login();

        await this._sendUser2Matrix();

        await sleep(4000);

        this._send3Pid2Matrix();
        this._sendMail();
    }

    async _login() {

        // set request url
        let url = 'https://matrix.iot-schweiz.ch/_matrix/client/r0/login';

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
                "user": process.env.MATRIX_BOT_USER,
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
        let url = 'https://matrix.iot-schweiz.ch/_synapse/admin/v2/users/' + this.id;

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
            "displayname": this.name,
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
        let url = 'https://matrix.iot-schweiz.ch/_synapse/admin/v2/users/' + this.id;

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
            host: 'sr1.iot-schweiz.ch',
            port: 587,
            auth: {
                user: 'matrix@iot-schweiz.ch',
                pass: process.env.MAIL_PASSWORD
            }
        });

        // send email
        transporter.sendMail({
            from: 'matrix@iot-schweiz.ch',
            to: this.email,
            subject: 'IOT Matrix login data',
            html: '<h1>User is created</h1><br>you can use one of this clients....<br>...<br>...<br>...<br><br>or use matrix.iot-schweiz.ch<br><br>user: ' + this.id + "<br>pw: " + this.pw
        });
    }


    async joinToRooms(rooms) {
        console.log("wait to join user to channel")
        await sleep(5000);
        console.log("start joining to channels")
        // set request url

        // set axios request config
        let config = {
            headers: {
                'Authorization': 'Bearer ' + process.env.MATRIX_CREATE_TOKEN
            }
        }
        let body = { user_id: this.id }
        console.log(body);

        rooms.forEach(async function (room) {

            let url = 'https://matrix.iot-schweiz.ch/_synapse/admin/v1/join/' + room;
            console.log(url);

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