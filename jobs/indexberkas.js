const fs = require('fs');
require('dotenv').config();
const path = require('path');
const crypto = require("crypto");
const { BerkasIndex } = require('../models');
let dir = process.env.DIR_PATH;


async function getFiles(dir) {
    let dataDir = fs.readdirSync(dir, { withFileTypes: true });
    // console.log(dataDir);
    // let data_noSEPs = [];
    for (let file of dataDir) {
        if (file.isDirectory()) {
            // console.log(`Directory: ${file.name}`);
            getFiles(file.parentPath + '/' + file.name);
            console.log(file.parentPath + '/' + file.name);
        } else {
            // console.log(`File: ${file.name}`);
            if (path.extname(file.name) === '.pdf') {
                let cek = await getFileChecksum(file.parentPath + '/' + file.name);
                console.log(file.parentPath + '/' + file.name);
                console.log(cek);
                    // console.log(`PDF: ${file.name}`);
                let data = {
                    no_sep: file.name.split(' ')[0],
                    file_path: file.parentPath + '/' + file.name,
                    checksum: cek
                };
              let  find = await BerkasIndex.findOne({ where: { no_sep: data.no_sep } });
                if (!find) {
                    BerkasIndex.create(data);
                } else if (find.checksum != data.checksum) {
                    BerkasIndex.update(data, { where: { no_sep: data.no_sep } });
                }
            }
        }
    }
    // console.log(data_noSEPs.length);
    // return data_noSEPs;

}


getFiles(dir);
// fileStream.write('\n]'); // Akhir array JSON
// fileStream.end(() => console.log('File JSON telah ditulis secara streaming!'));

async function pool() {
    let data = await getFiles(dir);
    console.log("Data no SEPs");
    console.log(data_noSEPs);
}
// pool();
async function name(params) {
    let cek = await getFileChecksum("/Volumes/CASEMIX/@CASEMIX 2024/FILE FINAL/2025/01. Januari 2025/31/1510R0010125V006160 SEBASTIANUS KIA.pdf")
    console.log(cek);

}
// name();
async function getFileChecksum(filePath, algorithm = "SHA-256") {
    const hash = crypto.createHash(algorithm);
    const stream = fs.createReadStream(filePath);

    for await (const data of stream) {
        hash.update(data);
    }

    return hash.digest("hex");
}

