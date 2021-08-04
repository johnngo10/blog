const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

exports.user_current_get = (req, res) => {
  res.json({
    id: req.user.id,
    username: req.user.username,
  });
};

exports.user_create_post = (req, res) => {
  const { username, password, confirmPassword } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "missing required fields" });
  } else {
    // Check for duplicate username
    User.findOne({ username: username }).then((user) => {
      if (user) {
        // Throw an error if username already exists
        req.flash(
          "usernameError",
          "A user has already registered with this username."
        );
        res
          .status(400)
          .json({ errors: "A user has already registered with this username" });
      } else if (password !== confirmPassword) {
        req.flash("passwordError", "Password does not match.");
        res.status(400).json({ errors: "Password does not match" });
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
                .then((user) => {
                  const payload = { id: user.id, username: user.username };

                  jwt.sign(
                    payload,
                    keys.secretOrKey,
                    { expiresIn: 3600 },
                    (err, token) => {
                      res.json({
                        success: true,
                        token: "Bearer " + token,
                      });
                    }
                  );
                })
                .catch((err) => console.log(err));
            }
          });
        });
      }
    });
  }
};

exports.user_login_post = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ errors: "Missing required fields" });
  } else {
    User.findOne({ username }).then((user) => {
      if (!user) {
        return res.status(404).json({ errors: "This user does not exist" });
      }

      bcrypt.compare(password, user.password).then((isMatch) => {
        if (isMatch) {
          const payload = { id: user.id, username: user.username };

          jwt.sign(
            payload,
            keys.secretOrKey,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token,
              });
            }
          );
        } else {
          req.flash("passwordError", "Password does not match.");
          res.status(400).json({ errors: "Password does not match" });
        }
      });
    });
  }
};
