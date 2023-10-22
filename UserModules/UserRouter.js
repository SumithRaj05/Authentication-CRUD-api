const express = require('express')
const Controller = require('./Controller')

const UserRoutes = express.Router()
const VerifyRoutes = express.Router()

UserRoutes
    .get('/', Controller.Get)
    .get('/userdata', Controller.GetUser)
    .post('/login', Controller.UserLogin)
    .post('/signup', Controller.UserSignup, Controller.EmailAuthentication)
    .patch('/update', Controller.UpdateUser)
    .delete('/delete', Controller.DeleteUser)

VerifyRoutes
    .get('/:id', Controller.VerifyLink)

module.exports = { UserRoutes, VerifyRoutes }