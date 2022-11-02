const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


//gets an id and returns the matching user
router.get('/getUserById/:id', async (req, res) => {
    try {
        const user = await prisma.users.findUnique({
            where: {
                id: req.params.id
            }
        })
        if(user){
            res.status = 200
            res.send(user)
        }
        else{
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
        const user= await prisma.users.findUnique({
            where:{
                id:req.params.id
            }
        })
        if(!user){
            res.status(400)
            res.send('User does not exist')
        }
        //if user does exist, check if password is correct
        else{
            if(user.password!= req.params.password){
                res.status(400)
                res.send('Password is incorrect')
            }
            //if everything is fine, return the user
            else{
                res.status(200)
                res.send(user)
            }
        }
    }
    catch (error) {
        res.status = 404
        console.log('Can not get data from db...')
        res.end()
    }
})



module.exports = router