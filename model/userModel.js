const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    username: {
        type: String,
        required: [true, "Please add contact name"],
        unique: [true, 'username has already been taken']
    },
    email: {
        type: String,
        required: [true, "Please add contact email"],
        unique: [true, 'username has already been taken']
    },
    password: {
        type: String,
        required: [true, "Please add contact phone"]
    },
},
    { timestamps: true, }
);

module.exports = mongoose.model('User', userSchema);

