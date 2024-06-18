require('dotenv').config();
var Express = require("express");

var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
const multer = require("multer");

var app = Express();
app.use(cors());

var CONNECTION_STRING = process.env.connection_string;
var COLLECTION_NAME = process.env.collection_name;
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

    database.collection(COLLECTION_NAME).find({}).toArray((error,result)=>{
        if(error){
            console.log("failed getting collection");
            response.status(500).send(error);
        } else {
            response.send(result);
        }
    });
})

app.post('/api/add',(request,response)=>{
    var myobj = { _id: "tt21354243",Title:"script",Year:"2022",Type:"movie",Poster:"https://m.media-amazon.com/images/M/MV5BMTg1N2IzYTQtZjYzMy00ODczLTk0NmQtOGI5MGY0MWM5ODEzXkEyXkFqcGdeQXVyMTM1MTMxNzEz._V1_SX300.jpg"};
    database.collection(COLLECTION_NAME).insertOne(myobj,function(error, response){
        if(error){
            console.log(error);
        } else {
            console.log("added to collection");
        }
    })
})

//{"_id:":"tt21358188","Title":"Finding Nemo","Year":"2022","imdbID":"tt21358188","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTg1N2IzYTQtZjYzMy00ODczLTk0NmQtOGI5MGY0MWM5ODEzXkEyXkFqcGdeQXVyMTM1MTMxNzEz._V1_SX300.jpg"}