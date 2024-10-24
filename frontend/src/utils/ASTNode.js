import React from 'react';

// Recursive component to display AST as a tree structure with connecting lines
function ASTNode({ node }) {
    if (!node) return null;

    return (
        <div style={{ position: 'relative', textAlign: 'center', margin: '20px' }}>
            {/* Display Operator or Operand */}
            <div style={{ display: 'inline-block', padding: '10px 20px', border: '1px solid black', borderRadius: '5px' }}>
                <strong>{node.value}</strong>
            </div>

            {/* Children displayed in a row under the parent */}
            {node.nodeType === 'operator' && (
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
                    <ASTNode node={node.left} />  {/* Left child */}
                    <ASTNode node={node.right} /> {/* Right child */}
                </div>
            )}
        </div>
    );
}

export default ASTNode;
