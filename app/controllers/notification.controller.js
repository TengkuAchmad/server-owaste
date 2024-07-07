// LIBRARY IMPORT
const { PrismaClient }          = require("@prisma/client")
const { v4: uuidv4 }            = require("uuid")

// ENVIRONMENT
const { successResponse }       = require("../responses/responses")
const { badRequestResponse }    = require("../responses/responses")

// PRISMA
const prisma            = new PrismaClient()



exports.create = async(req, res) => {
  try {
    const { title, description} = req.body

    if (!title || !description) {
      return badRequestResponse(res, "Please provide all the required fields")
    }

    let scheduleDate

    if (!req.body.schedule) {
        scheduleDate = new Date()
        scheduleDate.setMinutes(scheduleDate.getMinutes() + 1)
    } else {
        scheduleDate = new Date(req.body.schedule)
        if (isNaN(scheduleDate.getTime())) {
            return badRequestResponse(res, "Invalid date format for schedule");
        }
    }

    const dateInput = convertLocalDate(scheduleDate)
    
    let id = uuidv4()

    await prisma.notification.create({
        data: {
            UUID_NF: id,
            Title_NF: title,
            Description_NF: description,
            Schedule_NF: dateInput
        }
    })
    
    return successResponse(res, "Notification created successfully")

  } catch (error) {
      return badRequestResponse(res, "Internal Server Error", error.message)
  }
}

exports.findAll = async(req, res) => {
    try {

        const notifications = await prisma.notification.findMany({
            orderBy: { Schedule_NF: "asc" }
        })
        
        return successResponse(res, "Notifications retrieved successfully", notifications)

    } catch (error) {
        return badRequestResponse(res, "Internal Server Error", error.message)  
    }
}

exports.findNow = async(req, res) => {
    try {
        const currentTime = convertLocalDate(new Date());

        let data = []

        const notifications = await prisma.notification.findMany({
            where: {
                Schedule_NF: {
                    gte: currentTime
                }
            },
            orderBy: { Schedule_NF: "asc" }
        })

        if (notifications.length == 0) {
            return data
        } else {
            data = notifications
        }

        await prisma.notification.update({
            where: {
                UUID_NF: notifications[0]['UUID_NF'],
            }, data: {
                isSent_NF: true
            }
        })
        
        return data

    } catch (error) {
        return data
    }
}

exports.deleteAll = async(req, res) => {
    try {
        await prisma.notification.deleteMany({})
        return successResponse(res, "Notifications deleted successfully")
    } catch (error) {
        return badRequestResponse(res, "Internal Server Error", error.message)  
    }
}

function convertLocalDate(date) {
    const jakartaTimezone = "Asia/Jakarta";
    const jakartaDate = new Date(date.toLocaleString("en-US", { timeZone: jakartaTimezone }));
    const resultTimes = jakartaDate.setSeconds(0, 0)

    return new Date(resultTimes)
}