const express = require('express');
const { createUser, getUserById } = require('../controllers/userController');

const router = express.Router();

router.post('/create', createUser);
router.get('/:id', getUserById);

module.exports = router;  // Exporting router properly
