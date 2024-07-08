// ARRAY
let clients = {}

exports.create = async(ws, userUUID) => {
    try {
        if (!userUUID) {
            return false
        }
        clients[userUUID] = ws
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

exports.disconnect = async(userUUID) => {
    try {
        if (!userUUID) {
            return false
        }
        delete clients[userUUID]
        return true
    } catch (e) {
        console.log(e)
        return false
    }
}

exports.findConnected = async () => {
    try {
        return Object.keys(clients)
    } catch (e) {
        console.log(e)
        return false
    }
}

exports.findClients = () => {
    return clients
}