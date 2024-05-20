// app.js

const express = require('express');
const cors=require('cors')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// const registerRoutes = require('./routes/registerRoutes'); //for registration
// const authRoutes = require('./routes/authRoutes');//for authentication

const userRoutes = require('./routes/userRoutes');
const branchRoutes = require('./routes/branchRoutes');
const partiesRoutes = require('./routes/partiesRoutes');
const rateRoutes = require('./routes/rateRoutes');
const supplychainpartnerRoutes = require('./routes/supplychainpartnerRoutes');
const vehicleregistationRoutes = require('./routes/vehicleregistationRoutes');
const vehiclehireRoutes = require('./routes/vehiclehireRoutes');
const vehicleplacementRoutes = require('./routes/vehicleplacementRoutes');
const joborderRoutes = require('./routes/joborderRoutes');
const indentRoutes = require('./routes/indentRoutes');
const goodsreceiptRoutes = require('./routes/goodsreceiptRoutes');
const billcreateRoutes = require('./routes/billcreateRoutes');
const unloadingRoutes = require('./routes/unloadingRoutes');
const podRoutes = require('./routes/podRoutes');
require('dotenv').config();

const app = express();
app.use(express.static('public'));

// Connect to MongoDB
// mongoose.connect("mongodb+srv://parveenprajapati6010:Parveen%406010@cluster0.wug4llz.mongodb.net/<database>")
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('MongoDB connection error:', err));
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Load models
require('./models/User');


app.use(
  cors({
    origin: 'http://localhost:3000' // Allow requests from this origin
  })
);

// Bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



app.use('/', userRoutes);
app.use('/', branchRoutes);
app.use('/', partiesRoutes);
app.use('/', supplychainpartnerRoutes);
app.use('/', vehicleregistationRoutes);
app.use('/', vehiclehireRoutes);
app.use('/', vehicleplacementRoutes);
app.use('/', joborderRoutes);
app.use('/', indentRoutes);
app.use('/', goodsreceiptRoutes);
app.use('/', billcreateRoutes);
app.use('/', podRoutes);
app.use('/', rateRoutes);
app.use('/', unloadingRoutes);

const port = 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
