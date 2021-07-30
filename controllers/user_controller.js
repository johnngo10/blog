const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const jwt = require("jsonwebtoken");

exports.user_create_post = (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (!username || !password) {
    res.status(400).json({ error: "missing required fields" });
  } else {
    // Check for duplicate username
    User.findOne({ username: username }).then((user) => {
      if (user) {
        // Throw an error if username already exists
        req.flash(
          "usernameError",
          "A user has already registered with this username."
        );
        res.redirect("/user/signup");
      } else if (password !== confirmPassword) {
        req.flash("passwordError", "Password does not match.");
        res.redirect("/sign-up");
      } else {
        // Otherwise create new user
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(password, salt, (err, hashedPassword) => {
            if (err) {
              return next(err);
            } else {
              const user = new User({
                username,
                password: hashedPassword,
              })
                .save()
                .then(() => {
                  res.redirect("/user/login");
                })
                .catch((err) => console.log(err));
            }
          });
        });
      }
    });
  }
};
