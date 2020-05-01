const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    date: { type: Date, required: true },
    address: { type: String, required: true },
    authorid: {
        ref: 'User',
        type: mongoose.Schema.Types.ObjectId
    }
})

module.exports = mongoose.model('Event', EventSchema)