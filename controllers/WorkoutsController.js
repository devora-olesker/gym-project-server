const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//to get all workouts 
router.get("/getAllWorkouts", async (req, res) => {
    try {
        const workouts = await prisma.workouts.findMany({})
        
        res.status = 200
        res.send(workouts)
    }
    catch (error) {
        res.status = 404
        console.log('Can not get data from db...')
        res.end()
    }

})

//gets an id and returns the matching workouts
router.get('/getworkoutById/:id', async (req, res) => {
    try {
        const workouts = await prisma.workouts.findUnique({
            where: {
                // if id is't a number we need to convert to int
                id:parseInt(req.params.id) 
            }
            
        })
        if (workouts) {
            res.status = 200
            res.send(workouts)
        }
        else {
            res.status(400)
            res.send('workouts does not exist')
        }

    }
    catch (error) {
        res.status(400)
        console.log('Can not get data from db...' + error)
        res.send('Can not get data from db...' + error)
    }
})
//gets an id and deletes the workout with that id. returns the new list of workout
router.delete('/deleteworkout/:id', async (req, res) => {
    try {
        await prisma.workouts.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        const workouts = await prisma.workouts.findMany({})
        res.status(200)
        res.send(workouts)


    }
    catch (error) {
        res.status(400)
        console.log('Can not get data from db... ' + error)
        res.send(error)
    }
})

//gets an user id and returns all user workouts 
router.get('/getWorksoutrByUserId/:id', async (req, res) => {
    try {
        const workouts = await prisma.workouts.findMany({
            where: {
                userId: req.params.id
            }
        })
        if (workouts) {
            res.status = 200
            res.send(workouts)
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

//gets a id and an updated workout  objet, and updates the workout  with that id
//returns the updated workout
router.patch('/updateWorkout/:id', async (req, res) => {
    try {
        const updateWorkout = await prisma.workouts.update({
            where: {
                id: parseInt(req.params.id)            },
            data: req.body
        })
        res.status(200)
        res.send(updateWorkout)

    } catch (error) {
        res.status(400)
        console.log('Can not get data from db... ' + error)
        res.send(error)
    }
})


module.exports = router