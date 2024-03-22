const express = require('express');
const { createProfession, getProfession, editProfession } = require('../controller/auth_controller_profession');
const routerProfession  = express.Router();

routerProfession.post('/createProfession', createProfession);
routerProfession.get('/getProfession', getProfession);
routerProfession.put('/editProfession', editProfession);

module.exports = routerProfession;