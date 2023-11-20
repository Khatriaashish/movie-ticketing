const mongoose = require('mongoose');
require('dotenv').config()

mongoose.connect(process.env.MONGODB_URI, {
    dbName: process.env.MONGODB_NAME,
    autoCreate: true,
    autoIndex: true
}).then((success)=>{
    console.log("Database connected successfully");
}).catch((err)=>{
    console.log("Database connection failed miserably");
    process.exit(1);
})