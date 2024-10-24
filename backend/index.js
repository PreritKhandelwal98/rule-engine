const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv')
const ruleRoutes = require('./routes/rulesRoute')
// const userRoutes = require('./routes/userRoute')

dotenv.config();

const app = express();
app.use(bodyParser.json());

app.use(cors());

const port = process.env.PORT;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Simple route to check server
app.get('/', (req, res) => {
    res.send('Rule Engine API is running');
});

app.use('/api/rules', ruleRoutes);
// app.use('/api/users', userRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
