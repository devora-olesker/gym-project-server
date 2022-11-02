const express = require("express")
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get("/getAllMachiens", async (req, res) => {
    try {
        const machiens = await prisma.exersizeMachines.findMany({
            include: {
                difficultyLevels: {
                    select: {
                        numLevel: true,
                        workoutLength: true,
                        Instructions: true,
                    }
                },
                 machinePurposes: {
                    select:{goal:true}
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

module.exports = router