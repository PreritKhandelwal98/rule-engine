const express = require('express');
const { createRule, evaluateRuleById } = require('../controllers/ruleController');

const router = express.Router();

router.post('/create', createRule);
router.post('/evaluate', evaluateRuleById);

module.exports = router;  // Exporting router properly
