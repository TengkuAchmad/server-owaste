// LIBRARY IMPORT
const { v4: uuidv4 }        = require("uuid")

// ENVIRONMENT
const { getStorage, ref, deleteObject, uploadBytes, getDownloadURL} = require("firebase/storage")


exports.upload = async (category, file) => {
    try {
        if (!file || !file.length) {
            throw new Error("Invalid file")
        }

        const fileContent = file[0]
        const storage = getStorage();
        const storageRef = ref(storage, `${category}/${uuidv4()}.png`)

        const snapshot = await uploadBytes(storageRef, fileContent.buffer)
        const fileUrl = await getDownloadURL(snapshot.ref)

        return fileUrl
    } catch (error) {
        throw new Error(error.message)
    }
}

exports.delete = async (fileUrl) => {
    try {
        if (!fileUrl) {
            throw new Error("Invalid file url")
        }
        const storage = getStorage()
        const storageRef = ref(storage, `${fileUrl}`)
        
        deleteObject(storageRef).then(() => {
            console.log("File deleted successfully")
        }).catch((error) => {
            console.log("Error deleting file:", error)
        })

        return true
    } catch (error) {
        throw new Error(error.message)
    }
}