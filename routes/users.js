const express = require("express");
const router = express.Router();
const passport = require("passport");

// Require controller modules
const user_controller = require("../controllers/user_controller");

router.get("/test", (req, res) => {
  res.json({
    msg: "This is the user route",
  });
});

/// USER ROUTES ///

// GET request for current authenticated user
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  user_controller.user_current_get
);

// POST request for registering a new user
router.post("/signup", user_controller.user_create_post);

// POST request for logging in user
router.post("/login", user_controller.user_login_post);

module.exports = router;
