const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    roles: {
        User: {
            type: Number,
            default: 2000
        },
        Editor: Number,
        Admin: Number
    },
    pwd: {
        type: String,
        required: true
    },
    refreshToken: String
});

module.exports = mongoose.model('User',userSchema);