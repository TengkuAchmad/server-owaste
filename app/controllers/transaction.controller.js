// ENVIRONMENT 
require('dotenv').config()

// LIBRARY IMPORT
const { PrismaClient } = require("@prisma/client")
const { v4: uuidv4 } = require("uuid")

// CONSTANTS
const {
    successResponse,
    errorResponse,
    badRequestResponse
} = require("../responses/responses")

// PRISMA
const prisma = new PrismaClient()

// TRANSACTION SERVICES
const transaction_services = require("../services/transaction_services")

const generateUniqueNumericCode = () => {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}

// VOUCHER TRANSACTIONS
exports.voucherBuy = async (req, res) => {
    try {
        const { voucherID, userID } = req.body

        if (!voucherID || !userID) {
            return badRequestResponse(res, "Please provide all the required fields")
        }

        const userData = await prisma.userData.findUnique({
            where: {
                UUID_UA: userID
            },
            select: {
                UUID_UD: true
            }
        })

        if (!userData) {
            throw new Error("User not found")
        }

        const existingVoucherUser = await prisma.voucherUser.findFirst({
            where: {
                UUID_UD: userData.UUID_UD,
                UUID_VD: voucherID
            }
        })

        if (existingVoucherUser) {
            return errorResponse(res, "You have already purchased this voucher")
        }


        const [voucherPrice, userBalance, voucherQuota] = await Promise.all([
            transaction_services.getVoucherPrice(voucherID),
            transaction_services.getUserBalance(userID),
            transaction_services.getVoucherQuota(voucherID)
        ])

        if (userBalance < voucherPrice) {
            return errorResponse(res, "Insufficient balance")
        }

        if (voucherQuota < 1) {
            return errorResponse(res, "Quota exceeded")
        }

        await prisma.$transaction(async (prisma) => {
            await prisma.voucherData.update({
                where: {
                    UUID_VD: voucherID
                },
                data: {
                    Quota_VD: {
                        decrement: 1
                    }
                }
            })

            const voucherUserID = uuidv4()
            
            const uniqueCode = generateUniqueNumericCode()

            await prisma.voucherUser.create({
                data: {
                    UUID_VU: voucherUserID,
                    UUID_UD: userData.UUID_UD,
                    UUID_VD: voucherID,
                    isUsed_VU: false,
                    Code_VU : uniqueCode
                }
            })

            await prisma.userData.update({
                where: {
                    UUID_UA: userID
                },
                data: {
                    Balance_UD: {
                        decrement: voucherPrice
                    }
                }
            })

            await prisma.transactionData.create({
                data: {
                    UUID_TD: uuidv4(),
                    UUID_UD: userData.UUID_UD,
                    UUID_VU: voucherUserID,
                    Type_TD: "Voucher",
                    Amount_TD: voucherPrice,
                    Status_TD: "Success"
                }
            })
        })

        return successResponse(res, "Voucher Purchased Successfully")

    } catch (error) { 
        return errorResponse(res, "Internal Server Error", error.message)
    }
}
