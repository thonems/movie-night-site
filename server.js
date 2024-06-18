require('dotenv').config();
var Express = require("express");

var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());

var CONNECTION_STRING = process.env.connection_string;
var PORT = process.env.PORT || 3000;
var databaseName = "websitedb";
var database;
app.listen(PORT, ()=>{
    Mongoclient.connect(CONNECTION_STRING,(error,client)=>{
        if (error) {
            console.error("Failed to connect to the database!", error);
            return; //returning if error occurs
        }
        database=client.db(databaseName);
        console.log("Database connected");
    })
})

app.get('/api/movies',(request,response)=>{

    database.collection("moviescollection").find({}).toArray((error,result)=>{
        if(error){
            console.log("failed getting collection");
            response.status(500).send(error);
        }
        response.send(result);
    });
})