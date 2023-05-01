// connect to mongoDB
// require the mongoose package
const mongoose = require("mongoose")

// define a database name and URI and connect to it
const dbName = "mongooseIntro"
const uri = "mongodb://127.0.0.1/" + dbName
mongoose.connect(uri)

// use connection methods to log important information
const db = mongoose.connection
// connection success
db.once("open", () => console.log(`mongo is connected on ${db.host}:${db.port} ⛓`))
// connection failure
db.on("error", err => console.log('💥 the datacenter has exploded:', err))

// export all models
module.exports = {
    // export our models here
    User: require("./User"),
    Post: require("./Post")
}