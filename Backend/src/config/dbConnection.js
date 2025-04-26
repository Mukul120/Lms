const mongoose = require("mongoose")

module.exports.dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Db connection successfull");

    } catch (error) {
        console.log("Db error", error)

    }

}