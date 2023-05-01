const mongoose = require("mongoose")

// define the 'child' schema
const CommentSchema = new mongoose.Schema({
    content: {
        type: String
    }, 
    updoots: {
        type: Number,
        default: 1
    }
}, {
    timestamps: true
})

// define a 'parent' schema which has the child embedded in it
const PostSchema = new mongoose.Schema({
    title: {
        type: String
    },
    body: {
        type: String
    },
    // TODO: poster: reference to user who made the post
    updoots: {
        type: Number,
        default: 1
    }, 
    comments: [CommentSchema], // define a subdocument 1:M by putting the child schema in []
    // refernce to single poster who made this post
    poster: {
        // tell mongoose that this is a referenced
        type: mongoose.Schema.Types.ObjectId, 
        // tell mongoose what is beging referenced
        ref: "User"
    }
}, {
    timestamps: true
})

// when exporting and registering the mongoose model, we only make a model for the parent
module.exports = mongoose.model("Post", PostSchema)