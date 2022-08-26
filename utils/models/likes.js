const mongoose = require('mongoose')
const Schema = mongoose.Schema

// search

const likeSchema = new Schema({
    imdbID: {
        type: String
    }
})

const Like = mongoose.models.Like || mongoose.model("Like", likeSchema);

export default Like;