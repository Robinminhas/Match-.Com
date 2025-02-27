import mongoose from "mongoose"

const Schema = mongoose.Schema
const postSchema = new Schema({
    postUrl: {
        type: String,
        required: true
    },
    caption: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    likes: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{
        user: { type: Schema.Types.ObjectId, ref: 'User' },
        comment: { type: String, required: true },
        createdAt: { type: Date, default: new Date(Date.now()).toLocaleTimeString() }
    }],
    createdAt: {
        type: Date,
        default: new Date(Date.now()).toLocaleTimeString()
    }
})

const Post = mongoose.model('Post', postSchema)
export default Post

