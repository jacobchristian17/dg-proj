const express = require('express');
const { handleLogout } = require('../controller/logoutController');
const router = express.Router();

router.get('/', handleLogout);

module.exports = router;