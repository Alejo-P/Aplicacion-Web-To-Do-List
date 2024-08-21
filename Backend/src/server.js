import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import morgan from 'morgan'

import userRoutes from './routers/userRoutes.js'
import taskRoutes from './routers/taskRoutes.js'

const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
dotenv.config()

app.set('port', process.env.PORT || 3000)

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.use('/api', userRoutes);
app.use('/api', taskRoutes);

export default app;