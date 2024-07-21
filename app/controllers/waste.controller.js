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
const { errorResponse }     = require("../responses/responses")
const { notFoundResponse }  = require("../responses/responses")
const { badRequestResponse }= require("../responses/responses")

// PRISMA
const prisma            = new PrismaClient()

// SERVICES 
const file_services  = require("../services/file_services")


exports.create = async (req, res ) => {
    try {
        const { title, description } = req.body

        const image  = req.files

        if (!title, !description, !image) {
            return badRequestResponse(res, "Please provide all the required fields")
        }

        const fileUrl = await file_services.upload("wasteCategory", image)

        if (fileUrl == false) {
            return badRequestResponse(res, "Please provide a valid image")
        }

        await prisma.wasteCategory.create({
            data: {
                UUID_WC: uuidv4(),
                Title_WC: title,
                Description_WC: description,
                Image_WC: fileUrl
            }
        })

        return successResponse(res, "Waste Category created successfully")
    } catch (error) {
        return badRequestResponse(res, "Internal Server Error", error.message)
    }
}

exports.findAll = async(req, res) => {
    try {
        const responses = await prisma.wasteCategory.findMany({})
        
        return successResponse(res, "Waste Categories retrieved successfully", responses)
    } catch (error) {
        return badRequestResponse(res, "Internal Server Error", error.message)
    }
}

exports.findOne = async(req, res) => {
    try {
        const { id } = req.params

        const responses = await prisma.wasteCategory.findUnique({
            where: {
                UUID_WC: id
            }           
        })
        
        return successResponse(res, "Waste Category retrieved successfully", responses)
    } catch (error) {
        return badRequestResponse(res, "Internal Server Error", error.message)
    }  
}

exports.deleteAll = async (req, res) => {
    try {
        const responses = await prisma.wasteCategory.findMany({
            select:{
                Image_WC: true
            }
        })

        for (fileUrl of responses) {
            const isDeleted = await file_services.delete(fileUrl.Image_WC)
            if (isDeleted == false) {
                return badRequestResponse(res, "Internal Server Error", "Failed to delete one waste category")
            }
        }

        await prisma.wasteCategory.deleteMany({})
        
        return successResponse(res, "Waste Categories deleted successfully")
    } catch (error) {
        return badRequestResponse(res, "Internal Server Error", error.message)
    } 
}


exports.deleteOne = async (req, res) => {
    try {
        const { id } =  req.params 

        const responsesWasteCategory = await prisma.wasteCategory.findFirst({
            where: {
                UUID_WC: id
            }
        })

        const isDeleted = await file_services.delete(responsesWasteCategory.Image_WC)
        if (isDeleted == false) {
            return badRequestResponse(res, "Internal Server Error", "Failed to delete one waste category")
        }

        await prisma.wasteCategory.delete({
            where: {
                UUID_WC: id
            }
        })

        return successResponse(res, "Waste Category deleted successfully")
    } catch (error) {
        return badRequestResponse(res, "Internal Server Error", error.message)
    }
}