const { Op } = require("sequelize");
const crypto = require("crypto");
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const { BerkasIndex, Berkas, User } = require('../models');
let dir = process.env.DIR_PATH;
module.exports = {
    krimOtp: async (req, res) => {
        console.log(req.body);
        if (!req.body.no_wa) {
            return res.status(400).json({
                status: false,
                message: 'No Whatsapp is required',
                data: null
            });
        }
        let findUser = await User.findOne({
            where: {
                no_wa: req.body.no_wa
            }
        })
        if (!findUser) {
            return res.status(400).json({
                status: false,
                message: 'No Whatsapp not found',
                data: null
            });
        }
        let otp = Math.floor(10000 + Math.random() * 90000);
        findUser.update({
            otp
        })
        res.status(200).json({
            status: true,
            message: 'Silahkan cek Whatsapp anda',
            data: null
        });
    },
    pathFinder: async (req, res) => {
        console.log(req.body)
        let folder = []
        let pdf = []
        let no_seps = []
        if (Object.keys(req.body).length === 0){
            let dataDir = fs.readdirSync(dir, { withFileTypes: true });
            
            for (let file of dataDir) {
                if (file.isDirectory()) {
                    folder.push(file)
                } else {
                    if (path.extname(file.name) === '.pdf') {
                        pdf.push(file)
                    }

                }
            }
         return   res.status(200).json({
                status: true,
                message: 'file path',
                data: { folder, pdf }
            });
        }
        let dataDir = fs.readdirSync(req.body.path, { withFileTypes: true });
        for (let file of dataDir) {
            if (file.isDirectory()) {
                folder.push(file)
            } else {
                if (path.extname(file.name) === '.pdf') {
                    pdf.push(file)
                    updateChecksum(file.parentPath + '/' + file.name)
                    let no_sep = file.name.split(' ')[0];
                    no_seps.push(no_sep)
                                
                }

            }
        }
        if (no_seps.length >0){
            console.log("GASS")
            indexBerkas(no_seps)
            
        }

        return  res.status(200).json({
            status: true,
            message: 'file path',
            data: { folder, pdf }
        });
        
    }
}

async function updateChecksum(params) {
    // console.log(params);
    let file = params.split("/").pop();
    // console.log(file)
    // let cek = await getFileChecksum(params);
    // console.log(cek);
    let data = {
        no_sep: file.split(' ')[0],
        file_path: params,
        // checksum: cek
    };
    let find = await BerkasIndex.findOne({ where: { no_sep: data.no_sep } });
    if (!find) {
        BerkasIndex.create(data);
    } 
    // else if (find.checksum != data.checksum) {
    //     BerkasIndex.update(data, { where: { no_sep: data.no_sep } });
    // }
    return
    
}

async function getFileChecksum(filePath, algorithm = "SHA-256") {
    const hash = crypto.createHash(algorithm);
    const stream = fs.createReadStream(filePath);

    for await (const data of stream) {
        hash.update(data);
    }

    return hash.digest("hex");
}

async function indexBerkas(no_seps) {
 
let data = await BerkasIndex.findAll({
        where: {
            "$berkas.id$": { [Op.is]: null },
        no_sep: no_seps
        },
        include: [{
            model: Berkas,
            as: 'berkas',
            required: false
        }],
        // limit: 10
    });
   for (let dI of data) {
           console.log(dI.no_sep);
           // console.log(dI.file_path);
           try {
               let config = {
                   method: 'get',
                   url: process.env.API_1 + '/api/inacbg/get_claim_data?method=get_claim_data&noSEP=' + dI.no_sep,
               };
               let config2 = {
                   method: 'get',
                   url: process.env.API_2 + '/api/registrasi/findsep/' + dI.no_sep,
                   headers: {
                       'Authorization': process.env.SECRET_WA
                   }

               };
               let responseInacbg = await axios(config);
               let responseSEP = await axios(config2);
               let inacbg = responseInacbg.data.response.data;
               let sep = responseSEP.data.data;
               console.log(inacbg);
               let inserted = await Berkas.create({
                   berkas_index_id: dI.id,
                   no_sep: dI.no_sep,
                   status: inacbg.jenis_rawat === 1 ? 'ranap' : 'ralan',
                   kd_dr: sep.maping_dokter_dpjpvclaim.kd_dokter,
                   nm_pasien: sep.pasien.nm_pasien,
                   no_rm: sep.pasien.no_rkm_medis,
                   tanggal_masuk: convertDateFormat(inacbg.tgl_masuk),
                   tanggal_keluar: convertDateFormat(inacbg.tgl_pulang)
               })
               console.log(inserted)
           } catch (error) {
            console.log(error)
            
           }
   
           
   
           // return;
   
       }
       console.log(data.length)

}
function convertDateFormat(dateStr) {
    let [day, month, year] = dateStr.split("/");
    return `${year}/${month}/${day}`;
}
