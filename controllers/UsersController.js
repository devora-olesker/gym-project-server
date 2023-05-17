const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const bodyParser = require("body-parser")
const e = require("express")
const prisma = new PrismaClient()

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

//get all users
router.get("/getAllusers", async (req, res) => {
    try {
        const users = await prisma.users.findMany({})

        res.status = 200
        res.send(users)
    }
    catch (error) {
        res.status = 404
        console.log('Can not get data from db...')
        res.end()
    }
})
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
        res.status(400)
        console.log('Can not get data from db...' + error)
        res.send('Can not get data from db...' + error)
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
        res.status(400)
        console.log('Can not get data from db...' + error)
        res.send('Can not get data from db...' + error)
    }
})

//gets an id and checks if the user allready exiests
router.get('/doesExists/:id', async (req, res) => {
    try {
        if (await prisma.users.findUnique({ where: { id: req.params.id } })) {
            res.status(200)
            res.send(true)
        }
        else {
            res.status(200)
            res.send(false)

        }
    } catch (error) {
        res.status(400)
        console.log('Can not get data from db...' + error)
        res.send('Can not get data from db...' + error)
    }
})

//gets a user object in the body and checks if the user exists. 
//if it allredy exiests, it will return a message. if not it will add the new user to the db
router.post('/addNewUser', async (req, res) => {
    try {
        const newUser = await req.body
        console.log(newUser);
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
        res.status(400)
        console.log('Can not get data from db...' + error)
        res.send('Can not get data from db...' + error)
    }
})

//gets an id and deletes the user with that id. returns the new list of users
router.delete('/deleteUser/:id', async (req, res) => {
    try {
        await prisma.users.delete({
            where: {
                id: req.params.id
            }
        })
        const users = await prisma.users.findMany({})
        res.status(200)
        res.send(users)


    }
    catch (error) {
        res.status(400)
        console.log('Can not get data from db... ' + error)
        res.send(error)
    }
})

//gets a id and an updated user objet, and updates the user with that id
//returns the updated user
router.patch('/updateUser/:id', async (req, res) => {
    try {
        const updatedUser = await prisma.users.update({
            where: {
                id: req.params.id
            },
            data: req.body
        })
        res.status(200)
        res.send(updatedUser)

    } catch (error) {
        res.status(400)
        console.log('Can not get data from db... ' + error)
        res.send(error)
    }
})

module.exports = router