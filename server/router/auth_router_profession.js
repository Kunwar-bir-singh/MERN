const express = require('express');
const { createProfession, getProfession, editProfession, getProviders, unLinkProvider } = require('../controller/auth_controller_profession');
const routerProfession  = express.Router();
    
routerProfession.post('/createProfession', createProfession);
routerProfession.post('/getProfession', getProfession);
routerProfession.patch('/editProfession', editProfession);
routerProfession.get('/getProviders' , getProviders)
routerProfession.patch('/unLinkProvider' , unLinkProvider)

module.exports = routerProfession;