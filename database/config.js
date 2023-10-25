const mongoose = require('mongoose');

const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.DB_CNN);

        console.log("BBDD online!");
    } catch (error) {
        console.error(error)
        throw new Error("Error when started BBDD")
    }
}

module.exports = {
    dbConnection
}