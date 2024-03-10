const dotenv = require("dotenv");
dotenv.config();
const express = require('express');
const MongoDB = require('./utils/db');
const router = require('./router/auth_router');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use('/api/auth' , router);

MongoDB().then(()=>{
    app.listen(3001 , ()=>{
        console.log("Server Is Running")
})
})