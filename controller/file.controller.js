const uploadFile = require("../middleware/upload");
const fs = require('fs');
const mv = require('mv');
const path = require("path")
const baseUrl = "http://localhost:3001/files/";

// const directoryTree = require('directory-tree');

const upload = async (req, res) => {
    try {
        await uploadFile(req, res);

        if (req.file == undefined) {
            return res.status(400).send({ message: "Please upload a file!" });
        }

        res.status(200).send({
            message: "Uploaded the file successfully: " + req.file.originalname,
        });
    } catch (err) {
        if (err.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        }
        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${err}`,
        });
    }
};


const getListFiles = (req, res, space) => {


    const directoryPath = __basedir + "/resources/static/assets/user_uploads/" + req.kauth.grant.access_token.content.sub + "/project_temp/";


    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            console.log("send error 500");
            res.status(200).send([]);
        } else {

            let fileInfos = [];

            // if (files === undefined) {
            //     console.log("no files");
            //     res.status(200).send({ asdf: "ddd" });
            // }

            files.forEach((file) => {
                fileInfos.push({
                    name: file,
                    url: baseUrl + file,
                });
            });

            res.status(200).send(fileInfos);
        }
    });
};

const getListProjectFiles = (req, res, space) => {


    const directoryPath = __basedir + "/resources/static/assets/uploads/projects/";


    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            console.log("send error 500");
            res.status(200).send([]);
        } else {

            // let fileInfos = directoryTree(directoryPath, {normalizePath:true, attributes: ['mtime',"size", "type", "extension"]});

            const fileInfos = getAllProjectFiles(directoryPath);

            // if (files === undefined) {
            //     console.log("no files");
            //     res.status(200).send({ asdf: "ddd" });
            // }

            // files.forEach((file) => {
            //     fileInfos.push({
            //         name: file,
            //         url: baseUrl + file,
            //     });
            // });

            res.status(200).send(fileInfos);
        }
    });
};


// @ Todo use directoryTree module....
const getAllProjectFiles = function(dirPath, subPaths, fileInfos) {
    fileInfos = fileInfos || {}
    subPaths = subPaths || []

    files = fs.readdirSync(path.join(dirPath, ...subPaths))
  
    files.forEach(function(file) {
      if (fs.statSync(path.join(dirPath, ...subPaths) + "/" + file).isDirectory()) {
          
          fileInfos = getAllProjectFiles(dirPath, [...subPaths, file], fileInfos)
      } else {
        let fileInfoPointer = fileInfos
        subPaths.forEach((folder) => {
            if (fileInfoPointer[folder] === undefined) {
            fileInfoPointer[folder] = {}
            }
            fileInfoPointer = fileInfoPointer[folder]
        })
        if (fileInfoPointer["files"] === undefined) {
            fileInfoPointer["files"] = [];
        } 
        fileInfoPointer["files"].push({
            name: file
        });
      }
    })
  
    return fileInfos
  }

const download = (req, res) => {
    const fileName = req.params.name;
    const directoryPath = __basedir + "/resources/static/assets/user_uploads/" + req.kauth.grant.access_token.content.sub + "/project_temp/";

    res.download(directoryPath + fileName, fileName, (err) => {
        if (err) {
            res.status(500).send({
                message: "Could not download the file. " + err,
            });
        }
    });
};


const move2Project = (req, res, projectId) => {
    mv( __basedir + "/resources/static/assets/user_uploads/" + req.kauth.grant.access_token.content.sub + "/project_temp/", __basedir + "/resources/static/assets/uploads/projects/"+projectId+"/", {mkdirp: true}, function(err) {});
}

module.exports = {
    upload,
    getListFiles,
    download,
    move2Project,
    getListProjectFiles
};
