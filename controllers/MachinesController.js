const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
//to get all machines 
router.get("/getAllMachines", async (req, res) => {
    try {
        const machines = await prisma.exersizeMachines.findMany({
            include: {
                difficultyLevels: {
                    select: {
                        numLevel: true,
                        workoutLength: true,
                        Instructions: true,
                    }
                },
                machinePurposes: {
                    select: { goal: true }
                }
            }
        })
        res.status = 200
        res.send(machines)
    }
    catch (error) {
        res.status = 404
        console.log('Can not get data from db...')
        res.end()
    }

})


//gets an id and returns the matching machiens
router.get('/getMachineById/:id', async (req, res) => {
    try {
        const mechien = await prisma.exersizeMachines.findUnique({
            where: {
                // if id is't a number we need to convert to int
                id: parseInt(req.params.id)
            },
            include: {
                difficultyLevels: {
                    select: {
                        numLevel: true,
                        workoutLength: true,
                        Instructions: true,
                    }

                },
                machinePurposes: {
                    select: { goal: true }
                }
            }
        })
        if (mechien) {
            res.status = 200
            res.send(mechien)
        }
        else {
            res.status(400)
            res.send('mechien does not exist')
        }

    }
    catch (error) {
        res.status(400)
        console.log('Can not get data from db...' + error)
        res.send('Can not get data from db...' + error)
    }
})
//gets an id and deletes the Machine with that id. returns the new list of Machine
router.delete('/deleteMachine/:id', async (req, res) => {
    try {
        await prisma.machine.delete({
            where: {
                id: req.params.id
            }
        })
        const machines = await prisma.users.findMany({})
        res.status(200)
        res.send(machines)


    }
    catch (error) {
        res.status(400)
        console.log('Can not get data from db... ' + error)
        res.send(error)
    }
})


module.exports = router