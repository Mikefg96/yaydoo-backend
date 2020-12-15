const  express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const connectDB = require('./config/db.js')
const publicRouter = require('./routes/public.route.js')

dotenv.config()
connectDB()

const PORT = process.env.PORT || 8000
const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/', publicRouter);

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on localhost port ${PORT}`))