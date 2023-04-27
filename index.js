const db = require("./models")

const userCrud = async () => {
    try {
        // CREATE
        // 1. using the model as a constructor
        // saving the new instance to the db
        // using the constructor is not async
        // const newUser = db.User({
        //     name: "April",
        //     email: "ag@ga.com",
        //     isAdmin: true,
        //     age: 30
        // })

        // // save to the db -- this is async
        // await newUser.save() // this is when the user is written

        // 2. directly writing to the db
        // const gabe = await db.User.create({
        //     name: "Gabe",
        //     email: "gg@ga.com",
        //     isAdmin: true,
        //     age: 27
        // })

        // console.log(gabe)
        // READ
        // finding all (returns an array)
        const allUsers = await db.User.find({})
        allUsers.forEach(user => console.log(user.name))
        // finding one
        const april = await db.User.findOne({
            name: "April"
        })
        // console.log(april)
        // find by id helper method
        const foundGabe = await db.User.findById("644acb1f2bfe0871c14633de")
        console.log("hi, " + foundGabe.name)
        // UPDATE
        // 1. modify a model instance and the save it
        foundGabe.email = "gabe@ga.com"
        await foundGabe.save()
        // 2. direct update crud on the db
        
        // DESTROY
    } catch (err) {
        console.log(err)
    }
}

userCrud()