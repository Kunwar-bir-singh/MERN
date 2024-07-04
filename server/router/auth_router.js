const express = require('express');
const {clearCookies , register ,login, jwtVerify, getUserDetails, editUserDetails, googleLogin} = require('../controller/auth_controller_user');
const {createImage, getImage} = require('../controller/auth_controller_imageUpload');
const { emailVerification } = require('../controller/auth_controller_test');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Server Running...');
});
router.get('/clearCookies', clearCookies);
router.post('/registerUser', register);
router.post('/loginUser', login);
router.post('/googleLogin', googleLogin);

router.post('/jwtVerify', jwtVerify);
router.post('/getUserDetails', getUserDetails);
router.post('/editUserDetails', editUserDetails);

router.post('/emailVerification', emailVerification);

router.post('/createImage', createImage);
router.post('/getImage', getImage);

module.exports = router;
