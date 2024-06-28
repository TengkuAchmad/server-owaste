// LIBRARY IMPORT
const { PrismaClient }  = require("@prisma/client")
const { v4: uuidv4 }    = require("uuid")
const jwt               = require("jsonwebtoken")
const argon2            = require("argon2")

// CONSTANTS
const { JWT_SECRET }    = process.env

// PRISMA
const prisma            = new PrismaClient()

exports.findAll = async(req, res) => {
    try {
        const responses = await prisma.userAccount.findMany({})
        return res.status(200).json(responses)
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" })
    }
}