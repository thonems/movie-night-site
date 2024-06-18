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
var omdbApiKey= process.env.OMDB_API_KEY;
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

app.get('/api/omdb', (req, res) => {
    const { s, i, page, type } = req.query;
    let url = `https://www.omdbapi.com/?apikey=${omdbApiKey}`;
    if (s) url += `&s=${s}`;
    if (i) url += `&i=${i}`;
    if (page) url += `&page=${page}`;
    if (type) url += `&type=${type}`;

    console.log('Fetching URL:', url); // Log the URL being fetched

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received from OMDB API:', data); // Log the received data
            if (!data || typeof data !== 'object') {
                throw new Error('Invalid JSON received');
            }
            res.json(data);
        })
        .catch(error => {
            console.error('Error fetching from OMDB API:', error);
            res.status(500).send('Error fetching from OMDB API');
        });
});