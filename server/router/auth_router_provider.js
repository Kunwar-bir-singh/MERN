const express = require('express');
const routerProvider  = express.Router();
const { loginProvider, registerProvider, bookmarkProfession } = require('../controller/auth_controller_provider');

routerProvider.post('/registerProvider', registerProvider);
routerProvider.post('/loginProvider', loginProvider);
routerProvider.post('/bookmarkProfession', bookmarkProfession);

module.exports = routerProvider;