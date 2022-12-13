const mongoose = require('mongoose')
const Schema = mongoose.Schema

const issueSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    upvotedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    downvotedBy: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    timestamp: {
        type: Date,
        default: Date.now
    }
})


module.exports = mongoose.model("Issue", issueSchema)