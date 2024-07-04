// ENVIRONTMENT
require('dotenv').config()

// LIBRARY
const jwt = require("jsonwebtoken")

const { PrismaClient }      = require("@prisma/client")

// CONSTANT
const { JWT_SECRET } = process.env

// RESPONSES
const { badRequestResponse } = require("../responses/responses")

// PRISMA
const prisma            = new PrismaClient()

const authenticateToken = async (req, res, next) => {
    const authHeader    = req.headers['authorization']
    const token         = authHeader && authHeader.split(' ')[1]

    if (!token) {
        return badRequestResponse(res, "Unauthorized")
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
                return badRequestResponse(res, "Token expired")
            }

            req.locals = { user: decoded.userID }

            return next()

        } else {
            return badRequestResponse(res, "Access token invalid!")
        }
        
    } catch (err) {
        return badRequestResponse(res, err)
    }
}

module.exports = { authenticateToken }