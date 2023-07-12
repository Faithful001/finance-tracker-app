require('dotenv').config()
const express = require("express")
const cors = require('cors')
const mongoose = require('mongoose')
const transactionRouter = require('./views/transactionViews')


const app = express()

//middleware
app.use(express.json())
app.use(cors())
app.use((req, res, next)=>{
    console.log(req.path, req.method)
    next()
})

app.use('/api/transactions', transactionRouter)


mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT, ()=>{
            console.log("API running on port",  process.env.PORT)
        })
    })
    .catch((err)=> console.log(err))


