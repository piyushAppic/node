const express = require("express")
const router = express.Router()

const { createUser, addPost, addComment } = require("../controller/userController")
const { findUserDeatilsByPost, findUserDeatilsByComment } = require("../controller/populate/userFetchByRef")

router.post("/createuser", createUser)
router.post("/addpost", addPost)
router.post("/addcomment", addComment)

// router for populating data
router.post("/populateByPost", findUserDeatilsByPost)
router.post("/populateByComment", findUserDeatilsByComment) 



module.exports = router
