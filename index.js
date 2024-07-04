// LIBRARY IMPORT
const express           = require("express")
const bodyParser        = require("body-parser")
const cors              = require("cors")
const compression       = require("compression")
const cookieParser      = require("cookie-parser")
const multer            = require("multer")
const appFirebase       = require("./app/firebase/firebaseConfig");


// APP CONFIG
const app               = express()
const upload            = multer()
const port              = process.env.PORT || 3000

app.use(cors({ origin: true, credentials: true}))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(compression())

app.use(upload.any())

// ROUTES
const test_routes       = require("./app/routes/test.routes")
const user_routes       = require("./app/routes/user.routes")
const content_routes    = require("./app/routes/content.routes")

// ENDPOINT
const endpoints         = [ test_routes, user_routes, content_routes ]

app.use(endpoints)

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})