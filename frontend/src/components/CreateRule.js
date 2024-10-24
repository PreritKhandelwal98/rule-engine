import React, { useState } from 'react';
import ASTNode from './../utils/ASTNode';  // Import the updated ASTNode component

function CreateRule() {
    const [ruleString, setRuleString] = useState("");
    const [ast, setAst] = useState(null);  // New state to hold AST

    const createRule = async () => {
        const response = await fetch('http://localhost:5000/api/rules/create', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: 'Sample Rule', ruleString })
        });
        const data = await response.json();
        console.log(data);
        setAst(data.ast);  // Store the returned AST
    };

    return (
        <div>
            <h2>Create Rule</h2>
            <textarea
                rows={5}
                cols={60}
                value={ruleString}
                onChange={(e) => setRuleString(e.target.value)}
                placeholder="Enter rule string"
            />
            <br />
            <button onClick={createRule}>Create Rule</button>

            {ast && (
                <div>
                    <h3>Generated AST:</h3>
                    {/* Render AST as a tree using the updated ASTNode component */}
                    <ASTNode node={ast} />
                </div>
            )}
        </div>
    );
}

export default CreateRule;
