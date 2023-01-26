const UserController= require('./controllers/UsersController')
const MachiensController= require('./controllers/MachiensController')
const WorkoutsController= require('./controllers/WorkoutsController')
const BuildWorkoutController= require('./controllers/BuildWorkoutController')
const router=require('express').Router()

// router.use("/api/workoutsController",WorkoutsController)
router.use("/api/machiensController",MachiensController)
router.use("/api/usersController",UserController)
// router.use("/api/buildWorkoutController",BuildWorkoutController)


module.exports=router


