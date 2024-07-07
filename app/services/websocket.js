// LIBRARY IMPORT
const { WebSocketMiddleware }   = require("../middleware/ws.middleware")
const WebSocket                 = require("ws")


exports.WebSocketServices = (wss) => {
    try {
        // ON CONNECTION
        wss.on('connection', (ws, req) => {
            WebSocketMiddleware(ws, req, (UserUUID) => {
   
                ws.on('message', (message) => {
                    sendNotification()
                    console.log('received: %s', message)
                })

                ws.on('close', () => {
                    delete WebSocketData.wsclients[UserUUID]
                    writeJson(WebSocketData)
                    console.log('Connection Closed')
                })
            })
        })

    } catch (e) {
        throw new Error(e)
    }
}