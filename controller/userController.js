const User = require("../model/user")
const Post = require("../model/post")
const Comment = require("../model/comment")

const createUser = async(req, res) => {
    try{
        const {name, email } = req.body
        console.log(name, email, "user info....")
        if(!name || !email){
            return res.json({message:"required name and email !!"})
        }
        const isUserExist = await User.findOne({email})
        if(isUserExist){
            return res.json({message:"user already registered !!"})
        }
        const newUser = new User(req.body)
        await newUser.save()
        
        res.json({message:"user created successfully"})

    }catch(err){
        return res.json({message: err.message})
    }
    
}

const addPost = async(req, res) => {
    try{
        const {title, content, author_ref} = req.body
        const post = new Post({title, content, author_ref})
        await post.save()
        res.json({message: "post created successfully!!"})

    }catch(err){
        return res.json({message: err.message})
    }
}


const addComment = async(req, res) => {
    try{
        const {content, author_ref} = req.body
        const comment = new Comment({content, author_ref})
        await comment.save()
        res.json({message: "comment post successfully!!"})
    }catch(err){
        return res.json({message: err.message})
    }
}

const uploadFiles = async(req, res) => {
    try{
        console.log(req.files, "files")
        res.json({message: "files uploaded succssfully!!"})

    }catch(err){
        res.json({message:err.message})
    }
}

module.exports = { createUser, addPost, addComment, uploadFiles }