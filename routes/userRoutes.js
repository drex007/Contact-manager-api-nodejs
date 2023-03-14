const express = require('express');
const { registerUser } = require('../controllers/userController');

const router = express.Router();



router.post('/register', registerUser);

router.post('/login', (req, res) => {
    res.status(200).json({ message: "User logged in successfuly" })
});

router.get('/current', (req, res) => {
    res.status(200).json({ message: "current user info" })
});


module.exports = router