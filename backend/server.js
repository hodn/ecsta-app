const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const reflectionsRouter = require('./routes/reflections');
const winsRouter = require('./routes/wins');
const weeksRouter = require('./routes/weeks');
const usersRouter = require('./routes/users');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

app.use('/reflections', reflectionsRouter);
app.use('/wins', winsRouter);
app.use('/weeks', weeksRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});