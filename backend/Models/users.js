import mongoose from "mongoose"
import passportLocalMongoose from "passport-local-mongoose"

const Schema = mongoose.Schema

const userSchema = new Schema({
    profilePicture: {
        type: String,
    },
    fullname: {
        type: String,
        required: true
    },
    bio : {
        type: String,
        default: ''
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
        required: true
    },
    follower: {
        type: [String],
        default: []
    },
    following: {
        type: [String],
        default: []
    }
})

const defaultProfilePicture = {
    male: 'https://static.vecteezy.com/system/resources/previews/009/398/577/original/man-avatar-clipart-illustration-free-png.png',
    female: 'https://static.vecteezy.com/system/resources/previews/009/397/892/original/woman-face-expression-clipart-design-illustration-free-png.png',
    other: 'https://i.pinimg.com/originals/3d/26/02/3d2602e1b11f161f7366c70b06fab7ed.jpg'
}

userSchema.pre('save', function (next) {
    if (!this.profilePicture) {
        this.profilePicture = defaultProfilePicture[this.gender] || defaultProfilePicture['other']
    }
    next()
})

userSchema.plugin(passportLocalMongoose)
const User = mongoose.model('User', userSchema)
export default User