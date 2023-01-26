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
//gets a id and an updated machine objet, and updates the machine with that id
//returns the updated machine
router.patch('/updateMachine/:id', async (req, res) => {
    try {
        const updatedMachine = await prisma.exersizeMachines.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: req.body
        })
        res.status(200)
        res.send(updatedMachine)
    } catch (error) {
        res.status(400)
        console.log('Can not get data from db... ' + error)
        res.send(error)
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
        await prisma.exersizeMachines.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })
        const machines = await prisma.exersizeMachines.findMany({})
        res.status(200)
        res.send(machines)
    }
    catch (error) {
        res.status(400)
        console.log('Can not get data from db... ' + error)
        res.send(error)
    }
})
//Gets a workout goal id, and returns all machines with that goal	
router.get('/getMachinesByWorkoutGoal/:goalId', async (req, res) => {
    try {
        const machiens = await prisma.machinePurposes.findMany({
            where: {
                goalId: parseInt(req.params.goalId)
            },
            select: {
                machines: {
                    include: {
                        difficultyLevels: {
                            select: {
                                numLevel: true,
                                workoutLength: true,
                                Instructions: true,
                            }
                        }
                    }
                }
            }
        })
        res.status = 200
        res.send(machiens)
    }
    catch (error) {
        res.status = 404
        console.log('Can not get data from db...')
        res.end()
    }
})
//gets a machine object in the body and adds the new machine to the db	
router.post('/addNewMachine', async (req, res) => {
    try {
        const machineToAdd = await req.body
        const newMachine = await prisma.exersizeMachines.create({
            data: machineToAdd
        })
        res.status(200)
        res.send(newMachine)
    } catch (error) {
        res.status(400)
        console.log('Can not get data from db...' + error)
        res.send('Can not get data from db...' + error)
    }
})

module.exports = router