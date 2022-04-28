import mongoose = require('mongoose')

const EventSchema = new mongoose.Schema({
    createdBy: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    eventTime: {
        type: Date,
        required: true
    },
    place: {
        type: String,
        required: true
    },
    participants: [{
        type: String
    }
    ],

    leaveParticipants: [{
        type: String
    }],
    maximumParticipantsAllowed: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Event = mongoose.model('Event', EventSchema);

export default Event