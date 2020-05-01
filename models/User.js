const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    password: { type: String, required: true },
    events: [{
        ref: 'Event',
        type: mongoose.Schema.Types.ObjectId
    }]
})

module.exports = mongoose.model('User', UserSchema)