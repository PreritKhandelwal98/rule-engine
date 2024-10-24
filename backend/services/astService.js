class Node {
    constructor(nodeType, value = null, left = null, right = null) {
        this.nodeType = nodeType;  // 'operator' for AND/OR, 'operand' for expressions like age > 30
        this.value = value;        // The actual value for operand or operator
        this.left = left;          // Left child (for operators)
        this.right = right;        // Right child (for operators)
    }
}

function createRuleAST(ruleString) {
    console.log("Creating AST from rule string");

    // Tokenize the rule string into operands, operators, and parentheses
    const tokens = ruleString.match(/[\w]+|[><=]+|\(|\)|AND|OR|\'\w+\'/g);
    console.log("Tokens:", tokens);

    const operatorStack = [];
    const operandStack = [];

    function applyOperator(operator) {
        const rightOperand = operandStack.pop();
        const leftOperand = operandStack.pop();
        const node = new Node('operator', operator, leftOperand, rightOperand);
        operandStack.push(node);
    }

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (token === "(") {
            // We can just continue and collect sub-expression
            continue;
        } else if (token === ")") {
            // Closing parentheses; process the last collected expression
            while (operatorStack.length) {
                const operator = operatorStack.pop();
                applyOperator(operator);
            }
        } else if (token === "AND" || token === "OR") {
            // Handle logical operators
            while (operatorStack.length && (operatorStack[operatorStack.length - 1] === "AND" || operatorStack[operatorStack.length - 1] === "OR")) {
                const operator = operatorStack.pop();
                applyOperator(operator);
            }
            operatorStack.push(token);
        } else if (["<", ">", "="].includes(token)) {
            // If we find a comparison operator, combine the left and right operands
            const leftOperand = operandStack.pop(); // Get the left operand from the stack
            const rightOperand = tokens[i + 1]; // The next token will be the right operand

            // Create a combined operand node
            const operandNode = new Node('operand', `${leftOperand.value} ${token} ${rightOperand.replace(/'/g, "").trim()}`.trim());
            operandStack.push(operandNode);
            i++; // Skip the next token since it's already processed
        } else {
            // Handle the operand, removing quotes if necessary
            operandStack.push(new Node('operand', token.replace(/'/g, "").trim())); // Remove quotes around strings
        }
    }

    // Apply remaining operators in the stack
    while (operatorStack.length) {
        const operator = operatorStack.pop();
        applyOperator(operator);
    }

    const root = operandStack.length ? operandStack[0] : null;
    console.log("Generated AST:", JSON.stringify(root, null, 2)); // Better formatting for visualization
    return root;
}

// Example usage
// const ruleString = "(age > 30 AND department = 'Sales')";
// const ast = createRuleAST(ruleString);
// console.log("Final AST:", ast);

module.exports = {
    createRuleAST,
};
