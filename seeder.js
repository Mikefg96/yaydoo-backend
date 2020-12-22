const mongoose = require('mongoose')
const dotenv = require('dotenv')

const connectDB = require('./config/db')
const User = require('./models/User.model')
const mockUsers = require('./data/user.data')

const Product = require('./models/Product.model')
const mockProducts = require('./data/products.data')

dotenv.config()
connectDB()

const importData = async() => {
    try {
        await User.deleteMany()
        const users = await User.insertMany(mockUsers)

        const firstProduct = {...mockProducts[0], seller_id: users[1]._id}
        const secondProduct = {...mockProducts[1], seller_id: users[1]._id}

        await Product.deleteMany()
        await Product.insertMany([firstProduct, secondProduct])

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