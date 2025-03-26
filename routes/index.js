const express = require('express');
const router = express.Router();
const page = require('../controllers');
const api = require('../controllers/api');

router.get('/', page.index);
router.get('/admin', page.admin);
router.get('/admin/pdf', page.prePDF);

router.put('/api/otp', api.krimOtp);
router.post('/api/pathfinder', api.pathFinder);

module.exports = router;