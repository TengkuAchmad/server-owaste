// ENVIRONMENT 
require('dotenv').config()

// LIBRARY IMPORT
const { PrismaClient }      = require("@prisma/client")
const { v4: uuidv4 }        = require("uuid")
const jwt                   = require("jsonwebtoken")
const argon2                = require("argon2")

// CONSTANTS
const { JWT_SECRET }        = process.env
const { successResponse }   = require("../responses/responses")
const { notFoundResponse }  = require("../responses/responses")
const { errorResponse }     = require("../responses/responses") 
const { badRequestResponse }= require("../responses/responses")

// PRISMA
const prisma            = new PrismaClient()


exports.getUserBalance = async (userID) => {
    try {
        const userBalance = await prisma.userData.findUnique({
            where: {
                UUID_UA: userID,
            }, select:{
                Balance_UD: true
            }
        })
        return userBalance.Balance_UD
    } catch (error) {
        return errorResponse(res, "Internal Server Error", error.message)
    }
}

exports.getVoucherPrice = async (voucherID) => {
    try {
        const voucherData = await prisma.voucherData.findUnique({
            where: {
                UUID_VD: voucherID
            }, select:{
                Price_VD: true
            }
        })
        return voucherData.Price_VD
    } catch (error) {
        return errorResponse(res, "Internal Server Error", error.message)
    }
}

exports.getVoucherQuota = async (voucherID) => {
    try {
        const voucherData = await prisma.voucherData.findUnique({
            where: {
                UUID_VD: voucherID
            }, select:{
                Quota_VD: true
            }
        })
        return voucherData.Quota_VD
    } catch (error) {
        return errorResponse(res, "Internal Server Error", error.message)
    }
}