// LIBRARY IMPORT
const express           = require("express")
const bodyParser        = require("body-parser")
const cors              = require("cors")
const compression       = require("compression")
const cookieParser      = require("cookie-parser")
const multer            = require("multer")
const appFirebase       = require("./app/firebase/firebaseConfig");
const WebSocket         = require("ws")
const path              = require("path")   
const http              = require("http")

// SERVICES
const { WebSocketServices }    = require("./app/services/websocket.js")

// APP CONFIG
const app               = express()
const upload            = multer()
const server            = http.createServer(app)
const wss               = new WebSocket.Server({ server })
const port              = process.env.PORT || 3000

app.use(cors({ origin: true, credentials: true}))

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(cookieParser())

app.use(compression())

app.use(upload.any())

// WEBSOCKET
WebSocketServices(wss)


// ROUTES
const test_routes           = require("./app/routes/test.routes")
const user_routes           = require("./app/routes/user.routes")
const admin_routes          = require("./app/routes/admin.routes")
const content_routes        = require("./app/routes/content.routes")
const notification_routes   = require("./app/routes/notification.routes")

// ENDPOINT
const endpoints         = [ test_routes, user_routes, admin_routes, content_routes, notification_routes]

app.use(endpoints)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'app/public/index.html'));
});

server.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})