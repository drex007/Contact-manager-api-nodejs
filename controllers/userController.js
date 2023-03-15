const asyncHandler = require("express-async-handler")
const User = require('../model/userModel')
const bcrypt = require('bcrypt')
 require('dotenv').config();
const jwt = require('jsonwebtoken')


const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error('All fields are required');
    }

    const userAvailable = await User.findOne({ email })
    const usernameAvailable = await User.findOne({username})

    if (userAvailable) {
        res.status(400);
        throw new Error('Email already in use');
    }

    if (usernameAvailable) {
        res.status(400);
        throw new Error('Username already in use');
    }
    const hashedPassword = bcrypt.hash(password, 10);
    const user = await User.create({ username, email, password: hashedPassword })

    if (user) {
        res.status(200).json({ _id: user.id, email: user.email })
    } else {
        res.status(400);
        throw new Error("User wasn't created")
    }

});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne(email);
    if (!email || !password) {
        res.status(400);
        throw new Error('Email or password is mandatory')
    }

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
           user: {
            username: user.username,
            email: user.email,
            id: user.id
           }
        }, process.env.ACCESS_TOKEN, { expiresIn: "1m"} );

        res.status(200).json(accessToken);
      
    } else {
        res.status(400);
        throw new Error('No record found with this username or passoword')
    }



    res.status(200).json({ message: "User logged in successfuly" })
});

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get current user info" })
});






module.exports = { registerUser, loginUser, currentUser }