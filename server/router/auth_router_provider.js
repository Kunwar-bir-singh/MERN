const express = require('express');
const routerProvider  = express.Router();
const { loginProvider, registerProvider, bookmarkProfession ,getProviders} = require('../controller/auth_controller_provider');

routerProvider.post('/registerProvider', registerProvider);
routerProvider.post('/loginProvider', loginProvider);
routerProvider.post('/bookmarkProfession', bookmarkProfession);
routerProvider.post('/getProviders', getProviders);

module.exports = routerProvider;