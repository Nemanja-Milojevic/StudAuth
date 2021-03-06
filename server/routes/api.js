const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const db = "mongodb://Miloye:miloye11@ds135798.mlab.com:35798/studentdb"
const User = require('../models/user')
const Class = require('../models/class')
const jwt = require('jsonwebtoken')
const app = express()

const path = require('path')

mongoose.connect(db, err => {
    if(err){
        console.error('Error'+err)
    }else{
        console.log('Connected to mongodb')
    }
})

function verifyToken(req, res, next){
    if(!req.headers.authorization){
        res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]

    if(token === 'null'){
        res.status(401).send('Unauthorized request')
    }
    let payload = jwt.verify(token, 'secretKey')

    if(!payload){
        res.status(401).send('Unauthorized request')
    }
    req.useId = payload.subject
    next()
}

router.get('/', function (req, res) {
    res.render(path.join(__dirname + '../../dist/ngApp/index.html'));
  });

// router.get('/', function (req, res) {
//     app.use(express.static(path.join(__dirname, '../../dist/ngApp/index.html')));
//   });

router.post('/add', verifyToken, (req, res) => {
    let userData = req.body
    let user = new User(userData)

    user.save((err, registeredUser) => {
        if(err){
            console.log(err)
        }else{
            let payload = {subject: registeredUser._id}
            let token = jwt.sign(payload, 'secretKey')
            res.status(200).send({token})
        }
    })
})

router.post('/addclass', verifyToken, (req, res) => {
    let classData = req.body
    let classroom = new Class(classData)

    classroom.save((err, classes) => {
        if(err){
            console.log(err)
        }else{
            res.status(200).send(classes)
        }
    })
})

router.post('/login', (req, res) => {
    let userData = req.body

    User.findOne({email: userData.email}, (error, user) => {
        if(error){
            console.log(error)
        }else{
            if(!user){
                res.status(401).send('Invalid info')
            }else{
                if(user.password !== userData.password){
                    res.status(401).send('Invalid info')
                }else{
                    let payload = {subject: user._id}
                    let token = jwt.sign(payload, 'secretKey')
                    res.status(200).send({token})
                }
            }
        }
    })
})

router.get('/getall', verifyToken, (req, res) => {
    User.find({}, (err, registeredUsers) => {
        if(err){
            console.log(err)
        }else{
            res.status(200).send(registeredUsers)
        }
    })
})

router.get('/getloggedin', verifyToken, (req, res) => {
    if (req.headers && req.headers.authorization) {
        let authorization = req.headers.authorization.split(' ')[1]
        let decoded
        try {
            decoded = jwt.verify(authorization, 'secretKey');
        } catch (e) {
            return res.status(401).send('unauthorized');
        }
        let userId = decoded;
        // Fetch the user by id 
        User.findOne({_id: userId}, (err, logedUser) => {
            if(err){
                console.log(err)
            }else{
                res.status(200).send(logedUser)
            }
        })
    }
})

router.get('/getclass', verifyToken, (req, res) => {
    Class.find({}, (err, classroom) => {
        if(err){
            console.log(err)
        }else{
            res.status(200).send(classroom)
        }
    })
})

router.get('/:id/getstudentbyclassid', verifyToken, (req, res) => {
    User.find({class_id: req.params.id}, (err, user) => {
        if(err){
            console.log(err)
        }else{
            res.status(200).send(user)
        }
    })
})

router.delete('/:id/delete', (req, res) => {
    User.findByIdAndDelete(req.params.id, err => {
        if(err){
            console.log('err')
        }else{
            res.send('Deleted successfully')
        }
    })
})

router.delete('/:id/deleteclass', (req, res) => {
    Class.findByIdAndDelete(req.params.id, err => {
        if(err){
            console.log('err')
        }else{
            res.send('Deleted successfully')
        }
    })
})

router.put('/:id/update', (req, res) => {
    User.findByIdAndUpdate(req.params.id, {$set: req.body}, err => {
        if(err){
            console.log('err')
        }else{
            res.send('Product updated')
        }
    })
})

router.put('/:id/updatedel', (req, res) => {
    User.updateMany({class_id: req.params.id}, {class_id: null}, err => {
        if(err){
            console.log(err)
        }else{
            res.send('Product updated')
        }
    })
})

module.exports = router