import React from 'react';

// Recursive component to display AST as a tree structure with connecting lines
function ASTNode({ node }) {
    if (!node) return null;

    return (
        <div style={{ position: 'relative', padding: '20px', textAlign: 'center' }}>
            {/* Operator or Operand */}
            <div style={{ display: 'inline-block', position: 'relative', padding: '10px 20px', border: '1px solid black', borderRadius: '5px' }}>
                <strong>{node.value}</strong>
            </div>

            {/* Connecting lines */}
            {node.nodeType === 'operator' && (
                <>
                    {/* Horizontal line */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        width: '50px',
                        height: '1px',
                        backgroundColor: 'black',
                        transform: 'translateX(-50%)'
                    }} />
                    {/* Vertical line to the left child */}
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        left: '25%',
                        width: '1px',
                        height: '20px',
                        backgroundColor: 'black'
                    }} />
                    {/* Vertical line to the right child */}
                    <div style={{
                        position: 'absolute',
                        top: '100%',
                        right: '25%',
                        width: '1px',
                        height: '20px',
                        backgroundColor: 'black'
                    }} />
                </>
            )}

            {/* Children */}
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
