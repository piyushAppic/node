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
