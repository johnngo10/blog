const express = require("express");
const router = express.Router();

// Require controller modules
const user_controller = require("../controllers/user_controller");

router.get("/test", (req, res) => {
  res.json({
    msg: "This is the user route",
  });
});

/// USER ROUTES ///

// POST request for registering a new user
router.post("/signup", user_controller.user_create_post);

// POST request for logging in user
router.post("/login");

module.exports = router;
