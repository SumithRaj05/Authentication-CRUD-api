const express = require('express')
const bodyParser = require('body-parser')
const { UserRoutes, VerifyRoutes } = require('./UserModules/UserRouter')

const app = express()
const port = 3000 || process.env.PORT;

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/profile', UserRoutes)
app.use('/verify', VerifyRoutes)

app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server listening on https://127.0.0.1:${port}/profile`)
    }
})