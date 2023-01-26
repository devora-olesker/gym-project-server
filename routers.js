const UserController= require('./controllers/UsersController')
const MachinesController= require('./controllers/MachinesController')
const WorkoutsController= require('./controllers/WorkoutsController')
const BuildWorkoutController= require('./controllers/BuildWorkoutController')
const router=require('express').Router()

router.use("/api/workoutsController",WorkoutsController)
router.use("/api/machinesController",MachinesController)
router.use("/api/usersController",UserController)
// router.use("/api/buildWorkoutController",BuildWorkoutController)


module.exports=router


