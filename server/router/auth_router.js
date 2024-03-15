const express = require('express');
const {home , register ,login} = require('../controller/auth_controller_user');
const { loginProvider, registerProvider } = require('../controller/auth_controller_provider');
const router = express.Router();

router.get('/', home);
router.post('/registerUser', register);
router.post('/loginUser', login);
router.post('/registerProvider', registerProvider);
router.post('/loginProvider', loginProvider);
module.exports = router;
