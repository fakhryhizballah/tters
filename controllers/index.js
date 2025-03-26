const path = require('path');

module.exports = {
    index: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/index.html'));
    },
    admin: (req, res) => {
        res.sendFile(path.join(__dirname, '../views/admin/index.html'));
    },
    prePDF: (req, res) =>{
        res.sendFile(path.join(__dirname, '../views/admin/pdfPre.html'));
    }
}