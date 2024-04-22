const express = require('express');
const {clearCookies , register ,login, jwtVerify, getUserDetails} = require('../controller/auth_controller_user');

const router = express.Router();

router.get('/clearCookies', clearCookies);
router.post('/registerUser', register);
router.post('/loginUser', login);
router.post('/jwtVerify', jwtVerify);
router.post('/getUserDetails', getUserDetails);

module.exports = router;
