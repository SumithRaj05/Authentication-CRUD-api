// import requirements
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = 3000 || process.env.PORT;

// Middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



// start listening
app.listen(port, (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log(`Server listening on http://127.0.0.1:${port}`)
    }
})