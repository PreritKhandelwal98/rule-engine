const express = require('express');
const router = express.Router();
const Rule = require('../models/Rule');

// Function to create AST from a rule string
function createAST(ruleString) {
    // This is a simplified parser; you can enhance it
    // Parse the ruleString and create an AST
    // Example: "age > 30 AND department = 'Sales'"
    // AST structure
    const ast = {
        type: "AND",
        left: {
            type: "operand",
            value: "age > 30"
        },
        right: {
            type: "operand",
            value: "department = 'Sales'"
        }
    };
    return ast;
}

// Create a new rule
router.post('/create_rule', async (req, res) => {
    const { name, ruleString } = req.body;
    const ast = createAST(ruleString);

    const newRule = new Rule({ name, ast });
    await newRule.save();

    res.json({ message: "Rule created", rule: newRule });
});

// routes/rules.js (add to the same file)

function evaluateAST(ast, data) {
    if (ast.type === "operand") {
        // Evaluate the operand, e.g., "age > 30"
        const [attribute, operator, value] = ast.value.split(' ');
        if (operator === '>') return data[attribute] > parseInt(value);
        if (operator === '<') return data[attribute] < parseInt(value);
        if (operator === '=') return data[attribute] == value.replace(/'/g, ''); // Handling strings
    }
    if (ast.type === "AND") {
        return evaluateAST(ast.left, data) && evaluateAST(ast.right, data);
    }
    if (ast.type === "OR") {
        return evaluateAST(ast.left, data) || evaluateAST(ast.right, data);
    }
}

// Evaluate a rule against user data
router.post('/evaluate_rule', async (req, res) => {
    const { ruleId, userData } = req.body;

    const rule = await Rule.findById(ruleId);
    const result = evaluateAST(rule.ast, userData);

    res.json({ eligible: result });
});

// routes/rules.js (add to the same file)

// Combine two ASTs into one
function combineASTs(ast1, ast2, operator) {
    return {
        type: operator,
        left: ast1,
        right: ast2
    };
}

// Combine rules
router.post('/combine_rules', async (req, res) => {
    const { ruleIds, operator } = req.body; // operator can be AND or OR
    const rules = await Rule.find({ _id: { $in: ruleIds } });

    let combinedAST = rules[0].ast;
    for (let i = 1; i < rules.length; i++) {
        combinedAST = combineASTs(combinedAST, rules[i].ast, operator);
    }

    const newRule = new Rule({ name: "Combined Rule", ast: combinedAST });
    await newRule.save();

    res.json({ message: "Combined rule created", rule: newRule });
});



module.exports = router;
