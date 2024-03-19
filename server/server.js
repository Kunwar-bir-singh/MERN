const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const app = express();

const MongoDB = require('./utils/db');

const router = require('./router/auth_router');
const routerProvider = require('./router/auth_router_provider');
const routerProfession = require('./router/auth_router_profession');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api/auth' , router);
app.use('/api/authProvider' , routerProvider);
app.use('/api/authProfession' , routerProfession);

MongoDB().then(()=>{
    app.listen(3001 , ()=>{
        console.log("Server Is Running")
})
})