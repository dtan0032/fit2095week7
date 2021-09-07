var Actor = require('../models/actor');
var Movie = require('../models/movie');
const mongoose = require('mongoose');
module.exports = {
    getAll: function (req, res) {
        Movie.find({})
        .populate('actors') // populate with actors to get details
        .exec(function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
         });
    },
    createOne: function (req, res) {
        let newMovieDetails = req.body;
        newMovieDetails._id = new mongoose.Types.ObjectId();
        Movie.create(newMovieDetails, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json(movie);
        });
    },
    getOne: function (req, res) {
        Movie.findOne({ _id: req.params.id })
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();
                res.json(movie);
            });
    },
    updateOne: function (req, res) {
        Movie.findOneAndUpdate({ _id: req.params.id }, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            res.json(movie);
        });
    },
    //Q1
    deleteOne: function (req, res) {
        Movie.findOneAndRemove({ _id: req.params.movieId }, function (err, movie) {
            if (err) return res.status(400).json(err);
            res.json();
        });
    },
    //Q4    
    deleteOneActorList: function(req,res){
        Movie.findOne({ _id: req.params.movieId }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            let actorId = req.params.actorId;
            for(let i=0; i<movie.actors.length;i++){
                if(movie.actors[i]==actorId){
                    (movie.actors).splice(i,1);
                    movie.save(function (err) {
                        if (err) return res.status(500).json(err);
                        res.json(movie);
                    });
                }
            }
        });
    },
    //Q5
    addActor: function (req, res) {
        Movie.findOne({ _id: req.params.movieId }, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();
            Actor.findOne({ _id: req.body.id }, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();
                movie.actors.push(actor._id);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);
                    res.json(movie);
                });
            })
        })
    },
    //Q6
    getMoviesYears: function(req,res){
        let year1 = req.params.year1;
        let year2 = req.params.year2;
        let query = { year: { $gte: year2, $lte: year1 }};
        Movie.find(query,function (err, movies) {
            if (err) return res.status(400).json(err);
            res.json(movies);
        });
    },
    //Q9
    deleteMoviesYears: function(req,res){
        let year1 = req.body.year1;
        let year2 = req.body.year2;
        let query = { year: { $gte: year2, $lte: year1 }};
        console.log(year1 + year2)
        Movie.deleteMany(query, function (err) {
            if (err) return res.status(400).json(err);
            res.json();
        });
        console.log("delete successful.")
    }
};