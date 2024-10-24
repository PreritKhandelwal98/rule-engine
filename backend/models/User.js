const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    age: Number,
    department: String,
    salary: Number,
    experience: Number
});

module.exports = mongoose.model('User', userSchema);
