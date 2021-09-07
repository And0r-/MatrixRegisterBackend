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

        // set request url
        this.url = 'https://matrix.iot-schweiz.ch/_synapse/admin/v2/users/' + this.id;

        // set axios request config
        this.config = {
            headers: {
                'Authorization': 'Bearer ' + process.env.MATRIX_CREATE_TOKEN,
                'Content-Type': 'application/json'
            }
        }

        // set axios request body
        this.body = {
            "password": this.pw,
            "displayname": this.name,
            "threepids": [],
        }

        // fier first create request 
        await axios.put(this.url, this.body, this.config)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.log("error..." + error)
                console.log(error.response.data);
            });

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
        await axios.put(this.url, body2, this.config)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.log("error..." + error)
                console.log(error.response.data);
            });



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
        await transporter.sendMail({
            from: 'matrix@iot-schweiz.ch',
            to: this.email,
            subject: 'IOT Matrix login data',
            html: '<h1>User is created</h1><br>you can use one of this clients....<br>...<br>...<br>...<br><br>or use matrix.iot-schweiz.ch<br><br>user: '+this.id+"<br>pw: "+this.pw
        });

    }
}

module.exports = { User }