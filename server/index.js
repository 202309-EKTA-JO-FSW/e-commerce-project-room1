const express = require("express");
const adminRouter = require('./routes/admin')
const customerRouter = require('./routes/customer')
const jwt = require('jsonwebtoken')

require("dotenv").config();

const connectToMongo = require("./db/connection");

const app = express();
const port =
  process.env.NODE_ENV === "test"
    ? process.env.NODE_LOCAL_TEST_PORT
    : process.env.NODE_LOCAL_PORT;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
  connectToMongo();
});

app.use('/admin', adminRouter)
app.use('/customers', customerRouter)

// app.get('/test', async (req, res) => {
//     const user = { id: '65c27f3bbfce12315a4c229e' };
//     const token = await generateToken(user);
//     res.json({ token });
// });



module.exports = { app };
