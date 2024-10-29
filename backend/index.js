import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
import cors from 'cors'
import usersRoutes from './routes/user.route.js'

const app = express()
app.use(cookieParser())
const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true
}
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const port = process.env.PORT || 3000

app.use('/api/users', usersRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})