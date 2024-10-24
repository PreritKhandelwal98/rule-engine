import React, { useState } from 'react';
import ASTNode from './../utils/ASTNode';  // Reusing the ASTNode component for visualization

// Helper function to create AST nodes
function createNode(nodeType, value, left = null, right = null) {
    return { nodeType, value, left, right };
}

function CombineRules() {
    const [rules, setRules] = useState([]);
    const [combineOperator, setCombineOperator] = useState('AND');
    const [ast, setAst] = useState(null);
    const [currentRule, setCurrentRule] = useState('');

    // Handle the rule input
    const handleRuleChange = (event) => {
        setCurrentRule(event.target.value);
    };

    // Add rule to the list of rules
    const handleAddRule = () => {
        if (currentRule.trim() !== '') {
            setRules([...rules, currentRule.trim()]);
            setCurrentRule('');
        }
    };

    // Handle the operator selection (AND/OR)
    const handleOperatorChange = (event) => {
        setCombineOperator(event.target.value);
    };

    // Function to combine rules and generate the AST
    const handleCombineRules = () => {
        if (rules.length < 2) return;  // Need at least two rules to combine

        let combinedAst = createNode('operator', combineOperator);
        let currentNode = combinedAst;

        // Create AST from the list of rules
        rules.forEach((rule, index) => {
            const ruleNode = createNode('operand', rule);

            if (index === 0) {
                currentNode.left = ruleNode;  // Assign the first rule to the left
            } else if (index === 1) {
                currentNode.right = ruleNode;  // Assign the second rule to the right
            } else {
                // For more than 2 rules, recursively nest new operators
                const newOperatorNode = createNode('operator', combineOperator, combinedAst, ruleNode);
                combinedAst = newOperatorNode;
                currentNode = combinedAst;
            }
        });

        setAst(combinedAst);
    };

    return (
        <div>
            <h2>Combine Rules</h2>

            {/* Input to add individual rules */}
            <div>
                <input
                    type="text"
                    value={currentRule}
                    onChange={handleRuleChange}
                    placeholder="Enter a rule (e.g., age > 30)"
                />
                <button onClick={handleAddRule}>Add Rule</button>
            </div>

            {/* Display the added rules */}
            <div>
                <h3>Added Rules:</h3>
                <ul>
                    {rules.map((rule, index) => (
                        <li key={index}>{rule}</li>
                    ))}
                </ul>
            </div>

            {/* Dropdown to select AND/OR operator */}
            <div>
                <label>Combine rules using: </label>
                <select value={combineOperator} onChange={handleOperatorChange}>
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                </select>
            </div>

            {/* Button to combine rules */}
            <div>
                <button onClick={handleCombineRules}>Combine Rules</button>
            </div>

            {/* Display the AST */}
            {ast && (
                <div>
                    <h3>Generated AST:</h3>
                    <ASTNode node={ast} />
                </div>
            )}
        </div>
    );
}

export default CombineRules;
