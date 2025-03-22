const axios = require('axios');
require('dotenv').config();
const { BerkasIndex, Berkas } = require('../models');
const { Op } = require("sequelize");


async function getindex() {
    let data = await BerkasIndex.findAll({
        where: {
            "$berkas.id$": { [Op.is]: null } 
        },
        include: [{
            model: Berkas,
            as: 'berkas',
            required: false
        }],
        // limit: 10
    });
    console.log(data[0]);
   
    for (let dI of data) {
        console.log(dI.no_sep);
        // console.log(dI.file_path);

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
       let inserted =  await Berkas.create({
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

        // return;

    }
    console.log(data.length);
}
getindex();
function convertDateFormat(dateStr) {
    let [day, month, year] = dateStr.split("/");
    return `${year}/${month}/${day}`;
}
