const express = require('express');
const router = express.Router();
const regCon = require('../controller/registerController');

router.post('/', regCon.handleNewUser);

module.exports = router;