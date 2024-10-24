const mongoose = require('mongoose');

const ruleSchema = new mongoose.Schema({
    ruleString: { type: String, required: true },  // Human-readable rule
    ast: { type: Object, required: true },         // Serialized AST as JSON
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rule', ruleSchema);
