const express = require("express");
const adminRouter = require('./routes/admin')
const customerRouter = require('./routes/customer')

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
app.use('/customer', customerRouter)

module.exports = app;
