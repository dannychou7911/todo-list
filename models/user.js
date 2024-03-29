const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        // 注意！ Date.now 跟 Date.now()有差異
        default: Date.now,
    },
});
module.exports = mongoose.model('User', userSchema);
