const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const fs = require('fs')
const path = require('path')
var app_config = require('./app_config');

const mailBodyHtml = fs.readFileSync(path.resolve(__dirname, 'mail/welcome.html'), 'utf8')

// @ TODO load from config
const keycloakGroups2MatrixRooms = {
    '/IOT/CH/Member': [
        "!JoPOfPBJYFmsNbflqE:iot-schweiz.ch", // IOT
        "!KrEzIiFMEGnrdOaauN:iot-schweiz.ch", //DE
        "!dXPYjnDzWXdUCWavld:iot-schweiz.ch", // DE test raum
        "!SOzxwpDyTCsBHrFHji:iot-schweiz.ch", // German
        "!DkeSnVaQNtWVcCmFmp:iot-schweiz.ch", // Internatinal Projects
        "!VPAKbQvxzoxAzozUrN:iot-schweiz.ch", // Meeting announcements
        "!xJDZdxPrtVSTRHhZHt:iot-schweiz.ch", // World Chat
        "!qxzPEhJiEUzhPyTNYb:iot-schweiz.ch", // Matrix Maintenance
        "!caAqFPzIeEdYGtquLf:iot-schweiz.ch", // World Mails
    ]
};

class MatrixPromoter {
    constructor(req) {
        this.keycloakUserRequest = req;
        this.access_token;
        this.admin = false;
        this.matrixRooms = [];
        this.matrixUserId;
    }

    async promoteUser() {

        let keycloakUserRequest = this.keycloakUserRequest;
        let matrixRooms = [];


        // verify Matrix token and get user id to invite in Channels
        this.matrixUserId = await axios.post(app_config.matrixHost + '_matrix/client/r0/login', { type: "m.login.token", token: keycloakUserRequest.params.MToken })
            .then(function (response) {

                return response.data.user_id;
            });

        this.admin = keycloakUserRequest.kauth.grant.access_token.content.role.includes("Matrix Admin");

        this._setAdmin();

        console.log("matrix Id: ", this.matrixUserId);
        console.log("groups: ", keycloakUserRequest.kauth.grant.access_token.content.groups);

        console.log("admin: ", keycloakUserRequest.kauth.grant.access_token.content.role.includes("Matrix Admin"));



        for (const group of keycloakUserRequest.kauth.grant.access_token.content.groups) {
            console.log(keycloakGroups2MatrixRooms[group]);
            this._joinToRooms(keycloakGroups2MatrixRooms[group])
        }


    }


    // _send3Pid2Matrix() {
    //     // set request url
    //     let url = app_config.matrixHost + '_synapse/admin/v2/users/' + this.id;

    //     // set axios request config
    //     let config = {
    //         headers: {
    //             'Authorization': 'Bearer ' + this.access_token,
    //             'Content-Type': 'application/json'
    //         }
    //     }

    //     let body2 = { threepids: [] };

    //     // add phone to body
    //     if (this.phone) {
    //         body2.threepids.push(
    //             {
    //                 "medium": "msisdn",
    //                 "address": this.phone
    //             }
    //         )
    //     }

    //     // add mail to body
    //     if (this.email) {
    //         body2.threepids.push(
    //             {
    //                 "medium": "email",
    //                 "address": this.email
    //             }
    //         )
    //     }

    //     // add 3pid data
    //     axios.put(url, body2, config)
    //         .then(res => {
    //             console.log(res.data);
    //         })
    //         .catch(error => {
    //             console.log("error..." + error)
    //             console.log(error.response.data);
    //         });
    // }




    async _joinToRooms(matrixRooms) {
        // await sleep(5000);

        // set axios request config
        let config = {
            headers: {
                'Authorization': 'Bearer ' + process.env.MATRIX_BOT_TOKEN
            }
        }
        let body = { user_id: this.matrixUserId }
        console.log(body);

        matrixRooms.forEach(async function (room) {

            let url = app_config.matrixHost + '_synapse/admin/v1/join/' + room;

            console.log("url: ", url);

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

    async _setAdmin() {

        // set axios request config
        let config = {
            headers: {
                'Authorization': 'Bearer ' + process.env.MATRIX_BOT_TOKEN,
                'Content-Type': 'application/json'
            }
        }

        console.log("config: ",config);

        let body = { admin: this.admin }

        let url = app_config.matrixHost + '_synapse/admin/v2/users/' + this.matrixUserId;

        console.log("url: ",url);

        await axios.put(url, body, config)
            .then(res => {
                console.log(res.data);
            })
            .catch(error => {
                console.log("error..." + error)
                console.log(error.response.data);
            });

    }

}


function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

module.exports = { MatrixPromoter }