const Rule = require('../models/Rules');
const { createRuleAST } = require('../services/astService');
const { evaluateRule } = require('../services/evaluationService');

// Create a new rule
async function createRule(req, res) {
    const { ruleString } = req.body;

    try {
        const ast = createRuleAST(ruleString);  // Generate AST
        const newRule = new Rule({ ruleString, ast });
        const savedRule = await newRule.save();
        res.status(201).json({ savedRule, ast });  // Send the AST as well
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


// Evaluate a rule against user data
async function evaluateRuleById(req, res) {
    const { ruleId, userData } = req.body;

    try {
        const rule = await Rule.findById(ruleId);
        if (!rule) return res.status(404).json({ error: 'Rule not found' });

        const result = evaluateRule(rule.ast, userData);
        res.status(200).json({ eligible: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    createRule,
    evaluateRuleById,
};
