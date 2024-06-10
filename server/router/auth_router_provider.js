const express = require('express');
const routerProvider  = express.Router();
const { loginProvider, registerProvider, bookmarkProfession ,getBookmarkProviders} = require('../controller/auth_controller_provider');

routerProvider.post('/registerProvider', registerProvider);
routerProvider.post('/loginProvider', loginProvider);
routerProvider.post('/bookmarkProfession', bookmarkProfession);
routerProvider.post('/getBookmarkProviders',getBookmarkProviders);

module.exports = routerProvider;