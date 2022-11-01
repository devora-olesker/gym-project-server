const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const routers = require('./routers')


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//הרשאות גישה
const cors = require("cors")
app.use(cors())

//הפעלת הניתוב הבסיסי
app.use(routers)




const port=env('PORT')
//הרצה
app.listen(port, async() => {
    console.log(`I'm running on port ${port}`);
})