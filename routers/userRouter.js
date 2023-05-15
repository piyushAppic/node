const express = require("express")
const multer  = require('multer')
const upload = multer({ dest: 'uploads/', limits: { fileSize: 1024*1024*5 } }) // fileSize: bytes{1024 bytes = 1kb}

const router = express.Router()

const { createUser, addPost, addComment, uploadFiles } = require("../controller/userController")
const { findUserDeatilsByPost, findUserDeatilsByComment } = require("../controller/populate/userFetchByRef")

router.post("/createuser", createUser)
router.post("/addpost", addPost)
router.post("/addcomment", addComment)

// router for populating data
router.post("/populateByPost", findUserDeatilsByPost)
router.post("/populateByComment", findUserDeatilsByComment) 

// files access and save
router.post("/upload",upload.array('photos', 2), uploadFiles)



module.exports = router
