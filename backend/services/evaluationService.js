function evaluateRule(ast, userData) {
    if (ast.nodeType === "operand") {
        const [field, operator, value] = parseOperand(ast.value);
        if (operator === ">") return userData[field] > parseInt(value);
        if (operator === "<") return userData[field] < parseInt(value);
        if (operator === "=") return userData[field] === value;
    } else if (ast.nodeType === "operator") {
        if (ast.value === "AND") {
            return evaluateRule(ast.left, userData) && evaluateRule(ast.right, userData);
        } else if (ast.value === "OR") {
            return evaluateRule(ast.left, userData) || evaluateRule(ast.right, userData);
        }
    }
}

function parseOperand(operand) {
    const parts = operand.split(" ");
    return [parts[0], parts[1], parts[2]];
}

module.exports = {
    evaluateRule,
};
