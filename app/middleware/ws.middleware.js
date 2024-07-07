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

        const isUserExist = await prisma.userAccount.findUnique({
            where: {
                UUID_UA: decoded.userID,
            }
        })

        if (isUserExist) {

            if (decoded.exp < Date.now() / 1000) {
                ws.close(4001, "Token expired")
                return
            }

            ws.userID = decoded.userID

            next(ws)

        } else {
            ws.close(4001, "Invalid token")
            return
        }
    } catch (err) {
        ws.close(4001, err.message);
        return
    }   
}

module.exports = { WebSocketMiddleware}