// UNSUPPORTED FEATURES DUE TO SERVERLESS FUNCTION DEPLOYMENT
// DO NOT USE THIS FILE

// LIBRARY IMPORT
const { PrismaClient }          = require("@prisma/client")
const { v4: uuidv4 }            = require("uuid")

// ENVIRONMENT
const { successResponse }       = require("../responses/responses")
const { badRequestResponse }    = require("../responses/responses")

// PRISMA
// const prisma            = new PrismaClient()

// exports.create = async(req, res) => {
//   try {
//     const { title, description} = req.body

//     if (!title || !description) {
//       return badRequestResponse(res, "Please provide all the required fields")
//     }

//     let scheduleDate

//     if (!req.body.schedule) {
//         scheduleDate = new Date()
//         scheduleDate.setMinutes(scheduleDate.getMinutes() + 1)
//         scheduleDate.setSeconds(0, 0)
//     } else {
//         scheduleDate = new Date(req.body.schedule)
//         if (isNaN(scheduleDate.getTime())) {
//             return badRequestResponse(res, "Invalid date format for schedule");
//         }
//     }

//     const dateInput = localTime(scheduleDate)
    
//     let id = uuidv4()

//     await prisma.notification.create({
//         data: {
//             UUID_NF: id,
//             Title_NF: title,
//             Description_NF: description,
//             Schedule_NF: dateInput
//         }
//     })
    
//     return successResponse(res, "Notification created successfully")

//   } catch (error) {
//       return badRequestResponse(res, "Internal Server Error", error.message)
//   }
// }

// exports.findAll = async(req, res) => {
//     try {

//         const notifications = await prisma.notification.findMany({
//             orderBy: { Schedule_NF: "asc" }
//         })
        
//         return successResponse(res, "Notifications retrieved successfully", notifications)

//     } catch (error) {
//         return badRequestResponse(res, "Internal Server Error", error.message)  
//     }
// }

// exports.deleteAll = async(req, res) => {
//     try {
//         await prisma.notification.deleteMany({})
//         return successResponse(res, "Notifications deleted successfully")
//     } catch (error) {
//         return badRequestResponse(res, "Internal Server Error", error.message)  
//     }
// }

// exports.findNotification = async () => {
//     try {
//         const now  = localTime(new Date()) 
//         const notification = await prisma.notification.findMany({
//             where:{
//                 isSent_NF: false,
//                 Schedule_NF: {
//                     lte: now
//                 }
//             }
//         })

//         return notification
//     } catch (e) {
//         return false
//     }
// } 

// exports.sentNotification = async(notificationUUID) => {
//     return prisma.notification.update({
//         where: {
//             UUID_NF: notificationUUID
//         },
//         data: {
//             isSent_NF: true
//         }
//     })
// }

// function localTime(date) {
//     const utcOffset = 7; 
//     const utcOffsetMs = utcOffset * 60 * 60 * 1000; 
//     const localDate = date.getTime() + utcOffsetMs;
//     return new Date(localDate)
// }

// UNSUPPORTED FEATURES DUE TO SERVERLESS FUNCTION DEPLOYMENT
// DO NOT USE THIS FILE
