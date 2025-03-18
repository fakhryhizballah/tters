const fs = require('fs');
const path = require('path');

let dir = "/Volumes/CASEMIX/@CASEMIX 2024/FILE FINAL/2025";


async function getFiles(dir) {
    fs.readdir(dir, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.log(err);
        } else {
            // console.log(files);
            files.forEach(file => {
                // console.log(path.extname(file.name));
                // if (path.extname(file.name) === '.pdf') {
                //     // console.log(`PDF: ${file.name}`);
                    
                // }
                if (file.isDirectory()) {
                    // console.log(`Directory: ${file.name}`);
                    getFiles(file.parentPath+'/' +file.name);
                } else {
                    console.log(`File: ${file.name}`);
                }
            });
        }
    });
}

getFiles(dir);