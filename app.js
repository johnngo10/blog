const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const session = require("express-session");
const passport = require("passport");
const flash = require("connect-flash");
const db = require("./config/keys").mongoURI;
const { Mongoose } = require("mongoose");
// const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
// const postRouter = require("./routes/posts");

app.use(express.json());
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());

// Middleware for giving all views access to the currentUser variable
app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

// Connect database
Mongoose.connect(db, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
})
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

// app.use("/", (req, res) => {
//   res.send("Hello World!!");
// });
app.use("/api/user", userRouter);
// app.use("/api/post", postRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("Your app is listening on port 5000");
});
