let express = require("express"),
  multer = require("multer"),
  mongoose = require("mongoose"),
  uuidv4 = require("uuid/v4"),
  router = express.Router();

const DIR = "./public/";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 50,
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "video/mp4" ||
      file.mimetype == "video/m4p" ||
      file.mimetype == "video/m4v"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .mp4, .m4p and .m4p format allowed!"));
    }
  },
});

// User model
let User = require("../models/User");

router.post(
  "/user-profile",
  upload.single("profileVideo"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      profileVideo: url + "/public/" + req.file.filename,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User registered successfully!",
          userCreated: {
            _id: result._id,
            profileVideo: result.profileVideo,
          },
        });
      })
      .catch((err) => {
        console.log(err),
          res.status(500).json({
            error: err,
          });
      });
  }
);

router.get("/", (req, res, next) => {
  User.find().then((data) => {
    res.status(200).json({
      message: "User list retrieved successfully!",
      users: data,
    });
  });
});

module.exports = router;
