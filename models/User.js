// require the mongoose package
const mongoose = require("mongoose")

// define a mongoose schema
    // key/value pairs of the document in this collection
// mongoose.Schema({key/val pairs for the document}, { options })
const UserSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    }, 
    isAdmin: {
        type: Boolean
    },
    age: {
        type: Number
    },
    // array of ids that reference the posts that user has made
    posts: [{
        // tell mongoose that this a refernce
        type: mongoose.Schema.Types.ObjectId,
        // tell mongoose what document is being referenced
        ref: "Post"
    }]
}, {
    timestamps: true
})

// register the schema as a mongoose model and export the model
module.exports = mongoose.model("User", UserSchema) // returns a mongoose model and we are exporting it