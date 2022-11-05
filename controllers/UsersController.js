const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const bodyParser = require("body-parser")
const prisma = new PrismaClient()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })


//gets an id and returns the matching user
router.get('/getUserById/:id', async (req, res) => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                id: req.params.id
            }
        })
        if (user) {
            res.status = 200
            res.send(user)
        }
        else {
            res.status(400)
            res.send('User does not exist')
        }

    }
    catch (error) {
        res.status(404)
        console.log('Can not get data from db...')
        res.end()
    }
})

//gets id and password and checks if user exists and if the password is correct. 
//if correct- returns the user object, if not returns appropriate error
router.get('/logIn/:id/:password', async (req, res) => {
    try {
        //check if user exiests
        const user = await prisma.users.findUnique({
            where: {
                id: req.params.id
            }
        })
        if (!user) {
            res.status(400)
            res.send('User does not exist')
        }
        //if user does exist, check if password is correct
        else {
            if (user.password != req.params.password) {
                res.status(400)
                res.send('Password is incorrect')
            }
            //if everything is fine, return the user
            else {
                res.status(200)
                res.send(user)
            }
        }
    }
    catch (error) {
        res.status(404)
        console.log('Can not get data from db...')
        res.end()
    }
})

//gets a user object in the body and checks if the user exists. 
//if it allredy exiests, it will return a message. if not it will add the new user to the db
router.post('/addNewUser', async (req, res) => {
    try {
        const newUser = await req.body
        //check if user id allready exiests
        if (await prisma.users.findUnique({ where: { id: newUser.id } })) {
            res.status(400)
            res.send('User allready exiests')
        }
        //if the user dosent exiest, it will be aded to the db
        else {
            const user = await prisma.users.create({
                data: newUser
            })
            res.status(200)
            res.send(user)
        }

    } catch (error) {
        res.status(404)
        res.statusMessage = 'Can not get data from db...'
        console.log('Can not get data from db...' + error)
        res.end()
    }
})

module.exports = router