const mongoose = require('mongoose')

const connectDB = async() => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        }) 

        console.log(`MongoDB success: ${connection.connection.host}`)
    } catch(e) {
        console.error(`MongoDB error: ${e.message}`)
        process.exit(1)
    }
}

module.exports = connectDB