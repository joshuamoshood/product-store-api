const mongoose = require('mongoose');

const dbUrl = `mongodb+srv://${process.env.DATABSE_USERNAME}:${process.env.DATABSE_PASSWORD}@${process.env.DATABSE_HOST}/?retryWrites=true&w=majority&appName=Cluster0/${process.env.DB_NAME}`;

console.log(dbUrl);

const connectDB = ()=>{
    console.log("connected to the db successfully");
    return mongoose.connect(dbUrl);
}
module.exports = connectDB;