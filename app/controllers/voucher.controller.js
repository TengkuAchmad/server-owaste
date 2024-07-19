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
const { badRequestResponse }= require("../responses/responses")

// PRISMA
const prisma            = new PrismaClient()


exports.create = async(req, res) => {
    try {
        const { title, description, value, quota, price } = req.body

        if (!title || !description || !value || !quota || !price) {
            return badRequestResponse(res, "Please provide all the required fields")
        }

        await prisma.voucherData.create({
            data: {
                UUID_VD: uuidv4(),
                Title_VD: title,
                Description_VD: description,
                Value_VD: value,
                Quota_VD: quota,
                Price_VD: price
            }
        })

        return successResponse(res, "Voucher created successfully")
    } catch (error) {
        return badRequestResponse(res, "Internal Server Error", error.message)
    }
}

exports.findAll = async(req, res) => {
    try {
        const responses = await prisma.voucherData.findMany({
            where: {
                Quota_VD: {
                    gt: 0
                }
            }
        })
        
        return successResponse(res, "Vouchers retrieved successfully", responses)

    } catch (error) {
        return badRequestResponse(res, "Internal Server Error", error.message)
    }
}

exports.findOne = async(req, res) => {
    try {
        const { id } = req.params

        const responses = await prisma.voucherData.findUnique({
            where: {
                UUID_VD: id
            }           
        })

        return successResponse(res, "Voucher retrieved successfully", responses)

    } catch (error) {
        return badRequestResponse(res, "Internal Server Error", error.message)
    }
}

exports.update = async(req, res) => {
    try {
        const { id } = req.params

        const voucher = await prisma.voucherData.findUnique({
            where: {
                UUID_VD: id,
            }
        })

        if (voucher) {
            const updateData = Object.keys(req.body).reduce((acc, key) => {
                acc[key] = req.body[key];
                return acc;
                }, {})
            
            await prisma.voucherData.update({
                where: {
                    UUID_VD: id,
                }, data: 
                updateData,
            })

            return successResponse(res, "Voucher updated successfully")
        } else {
            return notFoundResponse(res, "Voucher not found")
        }
    } catch (error) {
        return badRequestResponse(res, "Internal Server Error", error.message)
    }
}

exports.deleteOne = async(req, res) => {
    try {
        const { id } =  req.params 

        const voucher = await prisma.voucherData.findUnique({
            where: {
                UUID_VD: id
            }
        })

        if (voucher) {
            await prisma.voucherData.delete({
                where: {
                    UUID_VD: id,
                }
            })

            return successResponse(res, "Voucher deleted successfully")
        } else {
            return notFoundResponse(res, "Voucher not found")
        }
    } catch (error) {
        return badRequestResponse(res, "Internal Server Error", error.message)  
    }
}

exports.deleteAll = async(req, res) => {
    try {
        const voucher = await prisma.voucherData.findMany({})

        if (voucher) {
            await prisma.voucherData.deleteMany({})

            return successResponse(res, "Vouchers deleted successfully")
        } else {
            return notFoundResponse(res, "Vouchers not found")
        }
    } catch (error) {
        return badRequestResponse(res, "Internal Server Error", error.message)
    }
}