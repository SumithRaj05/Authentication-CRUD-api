const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

const DataBase = process.env.MONGO_URL;

mongoose.set('strictQuery', false)

mongoose.connect(DataBase, { useNewUrlParser: true }).then((con) => {
    console.log("DataBase Connected!!")
})

const UserSchema = new mongoose.Schema({
    UserName: {
        type: String,
        required: [true, "Name is required"],
        unique: true
    },
    Email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    Password: {
        type: String,
        required: [true, "Password is required"]
    },
    CreatedAt: {
        type: Date,
        default: Date.now()
    },
    isVerified: Boolean
})

const EmailVerifySchema = new mongoose.Schema({
    UserId: String,
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

exports.Users = mongoose.model('ApiUsers', UserSchema)

exports.EmailVerify = mongoose.model('EmailVerification', EmailVerifySchema)