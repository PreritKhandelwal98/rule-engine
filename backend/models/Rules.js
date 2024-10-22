const mongoose = require('mongoose');

const NodeSchema = new mongoose.Schema({
    type: { type: String, required: true },  // "operator" or "operand"
    left: { type: mongoose.Schema.Types.Mixed },  // Reference to another node
    right: { type: mongoose.Schema.Types.Mixed }, // Reference to another node
    value: { type: String }  // For operands, e.g., "age > 30"
});

const RuleSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ast: NodeSchema,
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Rule', RuleSchema);
