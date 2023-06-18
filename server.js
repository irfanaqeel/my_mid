const express = require('express')
const jwtAuthorization = require('jsonwebtoken')
const app = express()
require('dotenv').config({path:'./config.env'})
const connectDb = require('./db/db')
const routerUser = require('./Routes/routes')
const port =  process.env.PORT || 5000 

//connectDB
connectDb()
//middleware
app.use(express.json())
app.use('/api',routerUser)

//routes
//connect app

app.get('/',(req,res)=>{
    res.send('Welcome to Auth System')
})

app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})