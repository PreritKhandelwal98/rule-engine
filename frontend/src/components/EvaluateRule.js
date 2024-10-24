import React, { useState } from 'react';

function EvaluateRule() {
    const [ruleId, setRuleId] = useState("");
    const [userData, setUserData] = useState({ age: "", department: "", salary: "" });

    const evaluateRule = async () => {
        const response = await fetch('http://localhost:5000/api/rules/evaluate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ruleId, userData })
        });
        const data = await response.json();
        console.log(data);
    };

    return (
        <div>
            <h2>Evaluate Rule</h2>
            <input
                type="text"
                value={userData.age}
                onChange={(e) => setUserData({ ...userData, age: e.target.value })}
                placeholder="Enter age"
            />
            <input
                type="text"
                value={userData.department}
                onChange={(e) => setUserData({ ...userData, department: e.target.value })}
                placeholder="Enter department"
            />
            <input
                type="text"
                value={userData.salary}
                onChange={(e) => setUserData({ ...userData, salary: e.target.value })}
                placeholder="Enter salary"
            />
            <button onClick={evaluateRule}>Evaluate Rule</button>
        </div>
    );
}

export default EvaluateRule;
