const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required:true
    },
    author_ref: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    }
})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment
