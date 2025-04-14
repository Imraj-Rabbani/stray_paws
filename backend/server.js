const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const authRoutes = require('./routes/authRoutes');

app.use(cors());
app.use(express.json());



const uri = process.env.MONGODB_URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB database connected successfully');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

app.use("/", authRoutes);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
