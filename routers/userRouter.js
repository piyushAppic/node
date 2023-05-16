const express = require("express")
const multer  = require('multer')
const fs = require('fs');

const uploadFolder = 'uploads/';

// Create the upload folder if it doesn't exist
if (!fs.existsSync(uploadFolder)) {
  fs.mkdirSync(uploadFolder);
}


// Create a storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Specify the destination folder where the file will be saved
      cb(null, uploadFolder);
    },
    filename: function (req, file, cb) {
      // Rename the file using a timestamp and the original file extension
      const timestamp = Date.now();
      const originalExtension = file.originalname.split('.').pop();
      const fileName = `${timestamp}.${originalExtension}`;
  
      cb(null, fileName);
    }
  });

const upload = multer({ storage: storage });

// const upload = multer({ dest: 'uploads/', limits: { fileSize: 1024*1024*5 }, filename: Date.now().toString() + '-' + file.originalname }) // fileSize: bytes{1024 bytes = 1kb}

const router = express.Router()

const { createUser, login, addPost, addComment, uploadFiles } = require("../controller/userController")
const { findUserDeatilsByPost, findUserDeatilsByComment } = require("../controller/populate/userFetchByRef")

// auth middleware
const authenticateToken = require("../middlewares/userVerifiy")

router.post("/createuser", createUser)
router.post("/login", login)
router.post("/addpost",authenticateToken, addPost)
router.post("/addcomment",authenticateToken, addComment)

// router for populating data
router.post("/populateByPost",authenticateToken, findUserDeatilsByPost)
router.post("/populateByComment",authenticateToken, findUserDeatilsByComment) 

// files access and save
router.post("/upload",authenticateToken,upload.array('photos', 2), uploadFiles)



module.exports = router
