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

    tokens.forEach(token => {
        if (token === "(") {
            operatorStack.push(token);
        } else if (token === ")") {
            while (operatorStack.length && operatorStack[operatorStack.length - 1] !== "(") {
                const operator = operatorStack.pop();
                applyOperator(operator);
            }
            operatorStack.pop();  // Pop the '('
        } else if (token === "AND" || token === "OR") {
            while (operatorStack.length && (operatorStack[operatorStack.length - 1] === "AND" || operatorStack[operatorStack.length - 1] === "OR")) {
                const operator = operatorStack.pop();
                applyOperator(operator);
            }
            operatorStack.push(token);
        } else if (["<", ">", "="].includes(token)) {
            const rightOperand = tokens.shift();  // Get the next token
            const leftOperand = operandStack.pop(); // Get the left operand from the stack

            // Create a combined operand node
            const operandNode = new Node('operand', `${leftOperand.value} ${token} ${rightOperand.replace(/'/g, "")}`.trim());
            operandStack.push(operandNode);
        } else {
            // Operand like age, salary, etc. (also handle quotes here)
            operandStack.push(new Node('operand', token.replace(/'/g, "").trim())); // Remove quotes around strings and trim whitespace
        }
    });

    while (operatorStack.length) {
        const operator = operatorStack.pop();
        applyOperator(operator);
    }

    const root = operandStack.length ? operandStack[0] : null;
    console.log("Generated AST:", JSON.stringify(root, null, 2)); // Better formatting for visualization
    return root;
}

// Example of usage
const ruleString = "(age > 30 AND department = 'Sales')";
const ast = createRuleAST(ruleString);
console.log("Final AST:", ast);

module.exports = {
    createRuleAST,
};
