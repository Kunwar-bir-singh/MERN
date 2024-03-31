const express = require('express');
const {clearCookies , register ,login} = require('../controller/auth_controller_user');

const router = express.Router();

router.get('/clearCookies', clearCookies);
router.post('/registerUser', register);
router.post('/loginUser', login);

module.exports = router;
