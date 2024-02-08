const express = require("express");
const adminRouter = require('./routes/admin')
const customerRouter = require('./routes/customer')
const jwt = require('jsonwebtoken')
const session = require('express-session');

require("dotenv").config();

const generateToken = async (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

const connectToMongo = require("./db/connection");

const app = express();
const port =
  process.env.NODE_ENV === "test"
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// Configure session options
const sess = {
  secret: process.env.SECRET_KEY,
  name: 'sid',
  resave: false, // don't save the sessions back to the session store
  saveUninitialized: false, // don't save uninitialized sessions to the session store
  cookie: {},
};

const middleware = [
  partials(), // allows layouts
  express.static(path.join(__dirname, 'public')), // serve static paths in /public
  express.urlencoded({ extended: false }), // parses urlencoded forms
  session(sess), // activates session handling in app
  methodOverride('_method'), // adds other rest http methods
  fileUpload({ createParentPath: true }), // parses file posts (uploads)
  attachAdmin, // adds admin to each response template
];

function attachAdmin(req, res, next) {
  res.locals.admin = req.session?.admin ?? null;
  next();
}

middleware.forEach((item) => {
  // in order
  app.use(item);
});



app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectToMongo();
});
app.use('/admin', adminRouter)
app.use('/customers', customerRouter)

app.get('/test', async (req, res) => {
    const user = { id: '65c27f3bbfce12315a4c229e' };
    const token = await generateToken(user);
    res.json({ token });
});



module.exports = {app, generateToken };
