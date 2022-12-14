const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    isTeacher: {
        type: Boolean
    },
    attendence: [
        {
            attend: "String",
            date: {
                type: Date,
                default: Date.now,
            }
        }
    ],
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now,
    },

})

module.exports = User = mongoose.model('user', UserSchema)
