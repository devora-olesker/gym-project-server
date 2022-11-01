const UserController= require('./controllers/WorkoutsController')
const MachiensController= require('./controllers/MachiensController')
const WorkoutsController= require('./controllers/MachiensController')
const BuildWorkoutController= require('./controllers/BuildWorkoutController')
const router=require('express').Router()

router.use("/api/workoutsController",WorkoutsController)
router.use("/api/machiensController",MachiensController)
router.use("/api/machiensController",MachiensController)
router.use("/api/buildWorkoutController",BuildWorkoutController)


module.exports=router


