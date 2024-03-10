const express = require('express');
const {home , register ,login} = require('../controller/auth_controller');
const router = express.Router();

router.get('/', home);
router.post('/register', register);
router.post('/login', login);
module.exports = router;
