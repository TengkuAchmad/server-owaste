// LIBRARY IMPORT
const { WebSocketMiddleware }   = require("../middleware/ws.middleware")
const { WebSocketServer }       = require("ws")
const { v4: uuidv4 }            = require("uuid")

// FILE SERVICES
const { readJson, writeJson } = require("../services/file_services")

// DATA
let WebSocketData            = readJson()

exports.WebSocketServices = (wss) => {
    try {
        // ON CONNECTION
        wss.on('connection', (ws, req) => {
            WebSocketMiddleware(ws, req, () => {

                // USERID
                const UserID = ws.UserID
                console.log(UserID)

                // ADD CLIENT TO JSON
                WebSocketData.wsclients[UserID] = { ws, connectedAt: new Date()}
                writeJson(WebSocketData)
                
                ws.on('message', (message) => {
                    console.log('received: %s', message)
                })

                ws.on('close', () => {

                    // REMOVE CLIENT
                    delete WebSocketData.wsclients[UserID]
                    writeJson(WebSocketData)
                    console.log('connection closed')
                })
            })
        })
    } catch (e) {
        throw new Error(e)
    }
}
