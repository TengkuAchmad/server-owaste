// LIBRARY IMPORT
const { WebSocketMiddleware }   = require("../middleware/ws.middleware")

// CONTROLLERS IMPORT
const { create, disconnect, findConnected, findClients} = require("../controllers/clients.controller")
const { findNotification, sentNotification }                  = require("../controllers/notification.controller")

exports.WebSocketServices = (wss) => {
    try {
        // ON CONNECTION
        wss.on('connection', (ws, req) => {
            WebSocketMiddleware(ws, req, async (UserUUID) => {

                await create(ws, UserUUID)
   
                ws.on('message', (message) => {
                    console.log('received: %s', message)
                })

                ws.on('close', async() => {
                    console.log(UserUUID)
                    await disconnect(UserUUID)
                    console.log('Connection Closed')
                })
            })
        })

        setInterval(async () => {
            try {
                const notifications = await findNotification()

                console.log(notifications)

                const connectedClients = await findConnected()

                const clients = findClients()

                connectedClients.forEach(clientId => {
                    const clientWs = clients[clientId]
                    if (clientWs && clientWs.readyState === 1) {
                        notifications.forEach(notification => {
                            clientWs.send(JSON.stringify(notification))
                            sentNotification(notification.UUID_NF)
                        })
                    }
                })

            } catch (error) {
                console.error("Error finding or sending notifications:", error);
            }
        }, 30000);

    } catch (e) {
        throw new Error(e)
    }
}