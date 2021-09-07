const express = require('express');
const mongoose = require('mongoose');

const actors = require('./routers/actor');
const movies = require('./routers/movie');

const app = express();

app.listen(8080);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/movies', function (err) {
    if (err) {
        return console.log('Mongoose - connection error:', err);
    }
    console.log('Connect Successfully');

});

//Configuring Endpoints
//Actor RESTFul endpoionts 
app.get('/actors', actors.getAll);
app.post('/actors', actors.createOne);
app.get('/actors/:id', actors.getOne);
app.put('/actors/:id', actors.updateOne);
app.post('/actors/:id/movies', actors.addMovie); //adds actor into actors document, movie in body, actor id in params
app.delete('/actors/:id', actors.deleteOne);
app.delete('/actorsNmovies/:actorId', actors.deleteOnenActors); //Q2
app.delete('/actors/:aId/:mId',actors.deleteOneMovieList); //Q3

//Movie RESTFul  endpoints
app.get('/movies', movies.getAll);
app.post('/movies', movies.createOne);
app.get('/movies/:id', movies.getOne);
app.put('/movies/:id', movies.updateOne);
app.delete('/movies/:movieId', movies.deleteOne); //Q1
app.delete('/movies/:actorId/:movieId', movies.deleteOneActorList)  // Q4 
app.post('/movies/:movieId', movies.addActor) //Q5 actor_id has to be in body
app.get('/movies/:year1/:year2', movies.getMoviesYears) //Q6
app.delete('/movies/',movies.deleteMoviesYears) //Q9