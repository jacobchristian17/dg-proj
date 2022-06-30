const express = require('express');
const router = express.Router();
const ROLES_LIST = require('../../config/roles');
const { getAllUsers } = require('../../controller/usersController');
const verifyRoles = require('../../middleware/verifyRoles');

router.route('')
    .get(verifyRoles(ROLES_LIST.Admin), getAllUsers);

module.exports = router;