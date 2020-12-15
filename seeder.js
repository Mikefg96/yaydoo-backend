const mongoose = require('mongoose')
const dotenv = require('dotenv')

const connectDB = require('./config/db')
const User = require('./models/User.model')
const mockUsers = require('./data/user.data')

dotenv.config()
connectDB()

const importData = async() => {
    try {
        await User.deleteMany()
        await User.insertMany(mockUsers)

        console.log('Data imported!')
        process.exit()
    } catch(e) {

        console.error(e)
        proccess.exit(1);
    }
}

const destroyData = async() => {
    try {
        await User.deleteMany()

        console.log('Data destroyed!')
        process.exit()
    } catch(e) {

        console.error(e)
        proccess.exit(1);
    }
}

process.argv[2] == '-d' ? destroyData() : importData()