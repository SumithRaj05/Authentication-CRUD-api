const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const users = require('./UserModel').Users
const EmailVerify = require('./UserModel').EmailVerify

dotenv.config()

// set up email configuration of nodemailer
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

const SendEmail = async (email, id) => {
    const mail = {
        from: process.env.USERAUTH,
        to: email,
        subject: "Verify your email",
        html: `<p>you have recieved one time verification link. 
        Please click <a href="${process.env.URL + "/verify/" + id}">
        here</a> to verify your email.</p>`
    }

    await EmailVerify.create({
        UserId: id
    })

    await transporter.sendMail(mail).catch((err) => {
        return res.status(203).json({
            status: 203,
            content: "error in sending mail"
        })
    })

}

// verification of email link
exports.VerifyLink = async (req, res) => {
    try {
        const EmailData = await EmailVerify.findOneAndDelete({ UserId: req.params.id })

        const UserData = await users.findOneAndUpdate({ _id: req.params.id }, { isVerifiedEmail: true })

        if (!EmailData || !UserData) {
            return res.status(404).sendFile(`${__dirname}/views/error.html`)
        }

        return res.status(200).sendFile(`${__dirname}/views/verified.html`)
    } catch (err) {
        res.status(404).sendFile(`${__dirname}/views/error.html`)
    }
}

// sends email verification link
exports.EmailAuthentication = async (req, res) => {
    try {
        const { email } = req.body
        const Data = await users.findOne({ Email: email })

        let EmailData = await EmailVerify.findOne({ userId: Data.id })

        if (EmailData) {
            return res.status(203).json({
                status: 203,
                content: "Verification link already sent"
            })
        }

        SendEmail(email, Data.id)

        return res.status(200).json({
            status: 200,
            content: "Email verification link sent"
        })
    } catch (err) {
        res.status(404).json({
            status: err
        })
    }
}

// test get response at /profile to check status
exports.Get = (req, res) => {
    try {
        return res.status(200).json({
            status: 200,
            content: "Get Request Success"
        })
    } catch (err) {
        res.status(404).json({
            status: err
        })
    }
}

// get userdetailes at /profile/userdata
exports.GetUser = async (req, res) => {
    try {
        const { token } = req.headers

        var decoded = jwt.verify(token, process.env.JWTKEY)

        if (!decoded) {
            return res.status(203).json({
                status: 203,
                content: "invalid token"
            })
        }

        var Data = await users.findOne({ Email: decoded.Email })

        if (!Data.isVerifiedEmail) {
            return res.status(203).json({
                status: 203,
                content: "User is not verified"
            })
        }

        return res.status(200).json({
            status: 200,
            data: {
                fullname: Data.FullName,
                emil: Data.Email
            }
        })
    } catch (err) {
        res.status(404).sendFile(`${__dirname}/views/notfound.html`)
    }
}

// post request at /profile/signup middleware
exports.UserSignup = async (req, res, next) => {
    try {
        const { fullname, mobilenumber, email, password } = req.body;

        const isPresentEmail = await users.findOne({ Email: email })
        const isPresentNumber = await users.findOne({ Email: mobilenumber })

        if (isPresentEmail || isPresentNumber) {
            return res.status(203).json({
                status: 203,
                content: "credintials already exist"
            })
        }

        const salt = await bcrypt.genSalt()

        const hashedPwd = await bcrypt.hash(password, salt)

        await users.create({
            FullName: fullname,
            Email: email,
            MobileNumber: mobilenumber,
            Password: hashedPwd,
            isVerifiedEmail: false
        })

        next()

    } catch (err) {
        res.status(404).json({
            status: err
        })
    }
}

// post request at /prouniquefile/login to recieve JWT token
exports.UserLogin = async (req, res) => {
    try {
        const { email, password } = req.body

        const Data = await users.findOne({ Email: email })

        if (!Data) {
            return res.status(203).json({
                status: 203,
                content: "Email is not registered"
            })
        }

        if (!Data.isVerifiedEmail) {
            return res.status(203).json({
                status: 203,
                content: "User is not verified"
            })
        }

        const isMatch = await bcrypt.compare(password, Data.Password)

        if (!isMatch) {
            return res.status(203).json({
                status: 203,
                content: "Incorrect Password"
            })
        }

        const Token = jwt.sign({
            UserId: Data._id,
            Email: email
        }, process.env.JWTKEY, {
            expiresIn: '5d'
        })

        return res.status(200).json({
            status: 200,
            token: Token
        })

    } catch (err) {
        console.log(err);
        res.status(404).json({
            status: err
        })
    }
}

// patch request to update user data at /profile/update and respond updated JWT token
exports.UpdateUser = async (req, res) => {
    try {
        const { token } = req.headers
        const { data } = req.body

        let UpdatedToken = token

        var decoded = jwt.verify(token, process.env.JWTKEY)

        if (!decoded) {
            return res.status(203).json({
                status: 203,
                content: "invalid token"
            })
        }

        if (data.fullname) {
            await users.findOneAndUpdate({ Email: decoded.Email }, { FullName: data.fullname })
        }
        if (data.email) {
            const UserData = await users.findOneAndUpdate({ Email: decoded.Email }, { Email: data.email, isVerifiedEmail: false })
            SendEmail(data.email, UserData.id)
            UpdatedToken = jwt.sign({
                UserId: UserData._id,
                Email: data.email
            }, process.env.JWTKEY, {
                expiresIn: '5d'
            })
        }
        if (data.mobilenumber) {
            await users.findOneAndUpdate({ Email: decoded.Email }, { MobileNumber: data.mobilenumber })
        }
        if (data.password) {
            const salt = await bcrypt.genSalt()
            const hashedPwd = await bcrypt.hash(data.password, salt)
            await users.findOneAndUpdate({ Email: decoded.Email }, { Password: hashedPwd })
        }


        return res.status(200).json({
            status: 200,
            content: "User updated",
            token: UpdatedToken
        })
    } catch (err) {
        res.status(404).json({
            status: err
        })
    }
}

// delete request to delete user account at /profile/delete
exports.DeleteUser = async (req, res) => {
    try {
        const { token } = req.headers

        var decoded = jwt.verify(token, process.env.JWTKEY)

        if (!decoded) {
            return res.status(203).json({
                status: 203,
                content: "invalid token"
            })
        }

        await users.findOneAndDelete({ Email: decoded.Email })

        return res.status(200).json({
            status: 200,
            content: "User deleted"
        })
    } catch (err) {
        res.status(404).json({
            status: err
        })
    }
}
