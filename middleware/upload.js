const fs = require("fs");
const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {

      const path = __basedir + "/resources/static/assets/user_uploads/"+req.kauth.grant.access_token.content.sub+"/project_temp";
      fs.mkdirSync(path, { recursive: true })
      
    cb(null, path );
  },
  filename: (req, file, cb) => {
    console.log(file.originalname);
    cb(null, file.originalname);
  },
});

let uploadFile = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
