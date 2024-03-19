const express = require('express');
const {home , register ,login} = require('../controller/auth_controller_user');

const router = express.Router();

router.get('/', home);
router.post('/registerUser', register);
router.post('/loginUser', login);

module.exports = router;
