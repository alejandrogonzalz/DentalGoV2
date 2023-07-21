import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import mongoose from 'mongoose';
import * as dotenv from "dotenv";

import connectDB from './services/database'

const app = express()
app.use(morgan('dev'))
app.use(cors({origin: ['http://localhost:5173'], credentials: true}))
app.use(express.json())

const PORT = process.env.PORT || 3000;
dotenv.config()

connectDB()

app.get('/ping', (_req, res) => {
    console.log('someone pinged here!')
    res.send('pong')
})

mongoose.connection.once('open', ()=>{
    console.clear()
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})

