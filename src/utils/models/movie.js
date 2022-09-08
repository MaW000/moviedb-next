const mongoose = require('mongoose')
const Schema = mongoose.Schema

const movieSchema = new Schema({
    Title: String,
    Year: String,
    Rated: String,
    imdbRating: String,
    Poster: String,
    Plot: String
})

const Movie = mongoose.models.Movie || mongoose.model('Movie', movieSchema)

export default Movie;