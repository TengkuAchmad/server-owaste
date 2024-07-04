// RESPONSES
const { successResponse }   = require("../responses/responses")
const { badRequestResponse }= require("../responses/responses")

exports.test = async(req, res) => {
    try {
        return successResponse(res, "Test Successful")
    } catch (error) {
        return badRequestResponse(res, "Test Failed", error)
    }
}