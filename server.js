require('dotenv').config();
var Express = require("express");
var Mongoclient = require("mongodb").MongoClient;
var cors = require("cors");
var bodyParser = require('body-parser');
const multer = require("multer");

var app = Express();
app.use(cors());

//middleware to parse json
app.use(bodyParser.json());

var CONNECTION_STRING = process.env.connection_string;
var COLLECTION_NAME = process.env.collection_name;
var PORT = process.env.PORT || 3000;
var databaseName = "websitedb";
var database;

app.listen(PORT, ()=>{
    console.log('Server running on port: '+PORT);
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
    console.log("Trying to add movie");
    var myMovie = request.body;
    database.collection(COLLECTION_NAME).insertOne(myMovie,function(error, result){
        if(error){
            console.log(error);
        } else {
            response.sendStatus(200);
            console.log(myMovie);
        }
    })
})

app.delete('/api/delete/:id',(req,res)=> {
    const id = req.params.id;
    console.log("deleting id: "+ id);
    database.collection(COLLECTION_NAME).deleteOne({ _id: id}, (error,result) => {
        if (error) {
            console.log(error);
            res.status(500).send('Error deleting movie');
        } else if (result.deletedCount === 0) {
            res.status(404).send('Movie not found');
        } else {
            res.sendStatus(200);
        }
    })
})