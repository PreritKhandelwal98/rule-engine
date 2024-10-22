const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = 5000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ruleengine', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Simple route to check server
app.get('/', (req, res) => {
    res.send('Rule Engine API is running');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
