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

// CONTROLLER
exports.auth = async(req, res) => {
    try {
        if(!req.body.email || !req.body.password) {
            return errorResponse(res, "Please provide email and password!")
        }
        
        const user  = await prisma.userAccount.findUnique({
            where: {
                Email_UA: req.body.email
            },
        });

        if (!user) {
            return notFoundResponse(res, "User not found!")
        }

        if (await argon2.verify(user.Password_UA, req.body.password)) {
            const accessToken = jwt.sign({ userID: user.UUID_UA }, JWT_SECRET, { expiresIn: "1d" })

            return successResponse(res, "Authenticated", accessToken )
        } else {
            return errorResponse(res, "Invalid email or password")
        }

    } catch (error) {
        return badRequestResponse(res, "Internal Server Error", error.message)
    }
}

exports.create = async(req, res) => {
    try {
        const { name, email, address, birthplace, birthdate, password } = req.body
        
        if (!name || !email || !address || !birthplace || !birthdate || !password) {
            return badRequestResponse(res, "Please provide all the required fields")
        }
        
        const hashedPassword = await argon2.hash(password)

        let uuid = uuidv4()
        
        await prisma.userAccount.create({
            data: {
                UUID_UA: uuid,
                Name_UA: name,
                Email_UA: email,
                Address_UA: address,
                Birthplace_UA: birthplace,
                Birthdate_UA: new Date(birthdate),
                Password_UA: hashedPassword
            }
        })

        await prisma.userData.create({
            data: {
                UUID_UA: uuid,
                Balance_UD: 0
            }
        })

        return successResponse(res, "User created successfully")
        
    } catch (error) {
        return badRequestResponse(res, "Internal Server Error", error.message)
    } 
}

exports.findAll = async(req, res) => {
    try {
        const responses = await prisma.userAccount.findMany({
            where: {
                isUser_UA: true,
                isAdmin_UA: false,
                isOperator_UA: false
            }, select: {
                UUID_UA: true,
                Email_UA: true,
                Name_UA: true,
                Phone_UA: true,
                Photo_UA: true,
                UserData: true,
            }
        })
        
        return successResponse(res, "Users retrieved successfully", responses)

    } catch (error) {
        return badRequestResponse(res, "Internal Server Error", error.message)
    }
}

exports.findOne = async(req, res) => {
    try {
        const id = req.locals.user

        const responses = await prisma.userAccount.findUnique({
            where: {
                UUID_UA: id,
            }, select: {
                UUID_UA: true,
                Email_UA: true,
                Name_UA: true,
                Phone_UA: true,
                Photo_UA: true,
                UserData: true,
            }
        })

        return successResponse(res, "User retrieved successfully", responses)

    } catch (error) {
        return badRequestResponse(res, "Internal Server Error", error.message)
    }
}

exports.update = async(req, res) => {
    try {
        const {id} = req.params

        const user = await prisma.userAccount.findUnique({
            where: {
                UUID_UA: id,
            }
        })

        if (user) {
            const updateData = Object.keys(req.body).reduce((acc, key) => {
                acc[key] = req.body[key];
                return acc;
                }, {})
            
            await prisma.userAccount.update({
                where: {
                    UUID_UA: id,
                }, data: 
                updateData,
            })

            return successResponse(res, "User updated successfully")
        } else {
            return notFoundResponse(res, "User not found")
        }
    } catch (error) {
        return badRequestResponse(res, "Internal Server Error", error.message)
    }
}

exports.deleteOne = async(req, res) => {
    try {
        const { id } =  req.params 

        const user = await prisma.userAccount.findUnique({
            where: {
                UUID_UA: id,
            }
        })


        if (user) {

            await prisma.userData.deleteMany({
                where: {
                    UUID_UA: id,
                }
            })

            await prisma.userAccount.delete({
                where: {
                    UUID_UA: id,
                }
            })

            return successResponse(res, "User deleted successfully")
        } else {
            return notFoundResponse(res, "User not found")
        }
    } catch (error) {
        return badRequestResponse(res, "Internal Server Error", error.message)  
    }
}

exports.deleteAll = async(req, res) => {
    try {
        const user = await prisma.userAccount.findMany({
            where: {
                isUser_UA: true,
                isAdmin_UA: false,
                isOperator_UA: false
            }
        })

        if (user) {

            await prisma.userData.deleteMany({
                where: {
                    UserAccount: {
                        isUser_UA: true,
                        isAdmin_UA: false,
                        isOperator_UA: false
                    }
                }
            })

            await prisma.userAccount.deleteMany({
                where: {
                    isUser_UA: true,
                    isAdmin_UA: false,
                    isOperator_UA: false
                }
            })

            return successResponse(res, "Users deleted successfully")
        } else {
            return notFoundResponse(res, "Users not found")
        }
    } catch (error) {
        return badRequestResponse(res, "Internal Server Error", error.message)
    }
}