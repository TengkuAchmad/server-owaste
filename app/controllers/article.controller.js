// LIBRARY IMPORT
const { v4: uuidv4 }        = require("uuid")
const { PrismaClient }      = require("@prisma/client")

// ENVIRONMENT
const { successResponse }       = require("../responses/responses")
const { errorResponse }         = require("../responses/responses")
const { badRequestResponse }    = require("../responses/responses")

// FILE SERVICES
const file_services              = require("../services/file_services")

// PRISMA
const prisma            = new PrismaClient()

exports.create = async(req, res) => {
    try {
      const { title, description } = req.body

      const image = req.files

      if (!title || !description || !image ) {
        return badRequestResponse(res, "Please provide all the required fields")
      }

      const fileUrl =  await file_services.upload("article", image)

      console.log(fileUrl)

      if (fileUrl == false) {
        return badRequestResponse(res, "Please provide a valid image")
      }
    
      await prisma.articleData.create({
        data: {
          Title_AD: title,
          Description_AD: description,
          Image_AD: fileUrl
        }
      })

      return successResponse(res, "Article created successfully")

    } catch (error) {
        return badRequestResponse(res, "Internal Server Error", error.message)
    }
}

exports.findAll = async(req, res) => {
  try {
    const responses = await prisma.articleData.findMany({
      orderBy: { createdAt: "desc" }
    })

    return successResponse(res, "Articles retrieved successfully", responses)

  } catch (error) {
    return badRequestResponse(res, "Internal Server Error", error.message)
  }
}

exports.findOne = async(req, res) => {
  try {
    const { id } = req.params
    const response = await prisma.articleData.findUnique({
      where: {
        UUID_AD: id
      }
    })
    return successResponse(res, "Article retrieved successfully", response)
  } catch (error) {
    return badRequestResponse(res, "Internal Server Error", error.message)
  }
}

exports.deleteAll = async(req, res) => {
  try {

    const filesData = await prisma.articleData.findMany({
      select:{
        Image_AD: true
      }
    })

    for (fileUrl of filesData) {
      const isDeleted = await file_services.delete(fileUrl.Image_AD)
      if (isDeleted == false) {
        return badRequestResponse(res, "Internal Server Error", "Failed to delete one article")
      }
    }

    await prisma.articleData.deleteMany({})

    return successResponse(res, "Article deleted successfully")
  } catch (error) {
    return badRequestResponse(res, "Internal Server Error", error.message)
  }
}

exports.deleteOne = async(req, res) => {
  try {
    const { id } = req.params

    
    const responseArticle = await prisma.articleData.findFirst({
      where: {
        UUID_AD: id
      }
    })

    console.log(responseArticle)
    
    const isDeleted = await file_services.delete(responseArticle.Image_AD)
    if (isDeleted == false) {
      return badRequestResponse(res, "Internal Server Error", "Failed to delete one article")
    }
    
    await prisma.articleData.delete({
      where: {
        UUID_AD: id
      }
    })

    return successResponse(res, "Article deleted successfully")
  } catch (error) {
    return badRequestResponse(res, "Internal Server Error", error.message)
  }
}