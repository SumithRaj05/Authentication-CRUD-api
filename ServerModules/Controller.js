const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const nodemailer = require('nodemailer')
const users = require('./Model').Users
const EmailVerify = require('./Model').EmailVerify

dotenv.config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.USERAUTH,
        pass: process.env.PASAUTH
    }
})

transporter.verify((err) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Authenticated email`);
    }
})

exports.Get = (req, res) => {
    try {
        return res.status(200).json({
            status: 'Get Request Success'
        })
    } catch (err) {
        res.status(404).json({
            status: err
        })
    }
}

exports.VerifyLink = async (req, res) => {
    try {
        const EmailData = await EmailVerify.findOneAndDelete({ UserId: req.params.id })
        const UserData = await users.findOneAndUpdate({ _id: req.params.id }, { isVerified: true })

        if (!EmailData || !UserData) {
            return res.status(404).sendFile(`${__dirname}/views/error.html`)
        }

        return res.status(200).sendFile(`${__dirname}/views/verified.html`)
    } catch (err) {
        res.status(404).sendFile(`${__dirname}/views/error.html`)
    }
}

exports.EmailAuthentication = async (req, res) => {
    try {
        const { email } = req.body
        const Data = await users.findOne({ Email: email })

        let EmailData = await EmailVerify.findOne({ userId: Data.id })

        if (EmailData) {
            return res.status(203).json({
                status: "Verification link already sent"
            })
        }

        const mail = {
            from: process.env.USERAUTH,
            to: email,
            subject: "Verify your email",
            html: `<p>you have recieved one time verification link. 
            Please click <a href="${process.env.URL + "/verify/" + Data.id}">
            here</a> to verify your email.</p>`
        }

        EmailData = await EmailVerify.create({
            UserId: Data.id
        })

        await transporter.sendMail(mail).catch((err) => {
            return res.status(203).json({
                status: "error in sending mail"
            })
        })

        return res.status(200).json({
            status: "Email verification link sent"
        })
    } catch (err) {
        res.status(404).json({
            status: err
        })
    }
}

exports.UserSignup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        const isPresentUser = await users.findOne({ UserName: username })
        const isPresentEmail = await users.findOne({ Email: email })

        if (isPresentUser) {
            return res.status(203).json({
                status: "UserName already exist"
            })
        }

        if (isPresentEmail) {
            return res.status(203).json({
                status: "Email already exist"
            })
        }

        const salt = await bcrypt.genSalt()

        const hashedPwd = await bcrypt.hash(password, salt)

        const Data = await users.create({
            UserName: username,
            Email: email,
            Password: hashedPwd,
            isVerified: false
        })

        next()

    } catch (err) {
        res.status(404).json({
            status: err
        })
    }
}

exports.UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        const Data = await users.findOne({ Email: email })

        if (!Data) {
            return res.status(203).json({
                status: "Email is not registered"
            })
        }

        if (!Data.isVerified) {
            return res.status(203).json({
                status: "User is not verified"
            })
        }

        const isMatch = await bcrypt.compare(password, Data.Password)

        if (!isMatch) {
            return res.status(203).json({
                status: "Incorrect Password"
            })
        }

        return res.status(200).json({
            status: 200,
            username: Data.UserName
        })

    } catch (err) {
        res.status(404).json({
            status: err
        })
    }
}

exports.UpdateUser = async (req, res) => {
    try {
        const { username, data } = req.body

        if (data.username) {
            await users.findOneAndUpdate({ UserName: username }, { UserName: data.username })
        }
        if (data.email) {
            await users.findOneAndUpdate({ UserName: username }, { Email: data.email, isVerified: false })
        }
        if (data.password) {
            const salt = await bcrypt.genSalt()
            const hashedPwd = await bcrypt.hash(data.password, salt)
            await users.findOneAndUpdate({ UserName: username }, { Password: hashedPwd })
        }

        return res.status(200).json({
            status: 200
        })
    } catch {
        res.status(404).json({
            status: err
        })
    }
}

exports.DeleteUser = async (req, res) => {
    try {
        const { username } = req.body;

        await users.findOneAndDelete({ UserName: username })

        return res.status(200).json({
            status: 200
        })
    } catch (err) {
        res.status(404).json({
            status: err
        })
    }
}
