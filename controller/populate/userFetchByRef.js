// const User = require("../../model/user")
const Post = require("../../model/post")
const Comment = require("../../model/comment")

const findUserDeatilsByPost = async(req, res) => {
    try{
        const {post_id} = req.body
        const user = await Post.findOne({_id: post_id}).populate("author_ref")
        return res.json({user: user})
    }catch(err){
        return res.json({message: err.message})
    }

}

const findUserDeatilsByComment = async(req, res) => {
    try{
        const {comment_id} = req.body
        const user = await Comment.findOne({_id: comment_id}).populate("author_ref")
        return res.json({user: user})
    }catch(err){
        return res.json({message: err.message})
    }

}

module.exports = { findUserDeatilsByPost, findUserDeatilsByComment } 