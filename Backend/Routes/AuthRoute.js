const { Signup, Login, Register } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = require("express").Router();
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

// Configure Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// configuration end

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/register", upload.single("file"), Register);
router.post("/", userVerification);

// routes for images

module.exports = router;
