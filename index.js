// LIBRARY IMPORT
const express           = require("express")
const bodyParser        = require("body-parser")
const cors              = require("cors")
const compression       = require("compression")
const cookieParser      = require("cookie-parser")
const multer            = require("multer")
const appFirebase       = require("./app/firebase/firebaseConfig");

// SERVICES

// ! UNSUPPORTED FEATURES DUE TO SERVERLESS FUNCTION DEPLOYMENT ====
// DO NOT USE THIS CODE

// const { WebSocketServices }    = require("./app/services/websocket.js")
// const http              = require("http")
// const path              = require("path")   
// const WebSocket         = require("ws")
// const server            = http.createServer(app)
// const wss               = new WebSocket.Server({ server })

// WebSocketServices(wss)

// ! UNSUPPORTED FEATURES DUE TO SERVERLESS FUNCTION DEPLOYMENT ====


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
const test_routes           = require("./app/routes/test.routes")
const user_routes           = require("./app/routes/user.routes")
const admin_routes          = require("./app/routes/admin.routes")
const content_routes        = require("./app/routes/content.routes")
const voucher_routes        = require("./app/routes/voucher.routes")
const transaction_routes    = require("./app/routes/transaction.routes")
const waste_routes          = require("./app/routes/waste.routes")

// ENDPOINT
const endpoints         = [ test_routes, user_routes, admin_routes, content_routes, voucher_routes, transaction_routes, waste_routes]

app.use(endpoints)


app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})