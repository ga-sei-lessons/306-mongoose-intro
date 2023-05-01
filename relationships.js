const db = require("./models")

const embeddebCrud = async () => {
    try {
        // upsert new post 
        const newPost = await db.Post.findOneAndUpdate(
            { title: "Mongoose Relationships are sick 🤘" },
            { body: "Just learning about mongoose relationship and they are the bee's knees." },
            { new: true, upsert: true }
        )

        // CREATE a comment
        // modify child array of subdocuments (this is not async)
        const newComment = {
            content: "wow, mongoose changed my life too!"
        }
        newPost.comments.push(newComment)
        // save the parent doc (this is async) to save the changes to the db as a transaction
        // await newPost.save()

        // READ a commnet
        const foundComment = newPost.comments.id("644ff3c2264020cd63e4ac22")
        console.log(foundComment)
        // UPDATE a comment
        // modify the object values ( not async)
        foundComment.content += "👏👏👏👏👏👏👏👏👏👏👏👏👏👏👏"
        foundComment.updoots += 1
        // save the parent (async)
        await newPost.save()
        // DESTROY a comment
        // .deleteOne is a subdoc instance method that is not async
        foundComment.deleteOne() 
        // newPost.comments[0].remove()
        // commit to the db the updated comments array by saving parent
        await newPost.save()
    } catch (err) {
        console.log(err)
    }
}

// embeddebCrud()

const referenceCrud = async () => {
    try {
        // CREATE (associating)

        // // have an instance of a user and an instance of a post (through creation or finding)
        // const foundUser = await db.User.findOne({})
        // console.log("found user:", foundUser.name)

        // const foundPost = await db.Post.findOne({})
        // console.log("found post:", foundPost.title)

        // // add the post to the user's array of post ids
        // foundUser.posts.push(foundPost.id)
        // // add the user to the post's poster feild
        // foundPost.poster = foundUser.id

        // // save the user (async)
        // await foundUser.save()
        // // save the post (async)
        // await foundPost.save()

        // READ (querying with relationships)
        const foundPoster = await db.User.findOne({
            name: "April"
        }).populate("posts") // 'populate' the posts field by making a quary for each one in the array and we will get back an array of documents
        
        // becuase be populated we can do something with each post
        // console.log(foundPoster)
        foundPoster.posts.forEach(post => console.log(post.title))

        // console.log(foundPoster)
        // find the poster of a specific post
        const foundPost = await db.Post.findOne({}).populate("poster")
        console.log("post was authored by", foundPost.poster.name)
    } catch (err) {
        console.log(err)
    }
}

referenceCrud()