const express = require('express');
const { createProfession, getProfession } = require('../controller/auth_controller_profession');
const routerProfession  = express.Router();

routerProfession.post('/createProfession', createProfession);
routerProfession.get('/getProfession', getProfession);

module.exports = routerProfession;