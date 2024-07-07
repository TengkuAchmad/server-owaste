const { WebSocketMiddleware } = require("../middleware/ws.middleware")
const { findNow }             = require("../controllers/notification.controller")
const WebSocket               = require("ws")

exports.WebSocketServices = (wss) => {
    try {
        wss.on('connection', (ws, req) => {
            WebSocketMiddleware(ws, req, () => {
                ws.on('message', (message) => {
                    console.log('received: %s', message)
                })

                ws.on('close', () => {
                    console.log('connection closed')
                })
            })
        })

        setInterval( async() => {
            try {
                const notification = await findNow()
                console.log(notification)
                wss.clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(notification))
                    }
                })
            } catch (e) {
                console.error('Error fetching notifications:', e);
            }
        }, 5000);

    } catch (e) {
        throw new Error(e)
    }
}
