// ENVIRONTMENT
require('dotenv').config()

// LIBRARY
const jwt = require("jsonwebtoken")

const { PrismaClient }      = require("@prisma/client")

// CONSTANT
const { JWT_SECRET } = process.env

// PRISMA
const prisma            = new PrismaClient()

const WebSocketMiddleware = async (ws, req, next) => {
    const params    = new URLSearchParams(req.url.split('?')[1])

    const token      = params.get('token')
    
    if (!token) {
        ws.close(4001, 'Unauthorized')
        return
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)

        const user = await prisma.userAccount.findUnique({
            where: {
                UUID_UA: decoded.userID,
            }
        })

        if (!user) {
            ws.close(4001, "Invalid token")
            return
        }

        if (decoded.exp < Date.now() / 1000) {
            ws.close(4001, "Token expired")
            return
        }
        
        const userUUID = decoded.userID

        return next(userUUID)

    } catch (err) {
        ws.close(4001, err.message);
        return
    }   
}


module.exports = { WebSocketMiddleware}