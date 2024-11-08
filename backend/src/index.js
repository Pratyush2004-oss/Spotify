import express from 'express';
import dotenv from 'dotenv';
import path from 'path'
import { clerkMiddleware } from '@clerk/express'
import fileUplaod from 'express-fileupload'
import cors from 'cors';
// created modules

// Database connection
import { connectDb } from './lib/db.js';

// routes
import userRoutes from './routes/user.route.js'
import authRoutes from './routes/auth.route.js'
import adminRoutes from './routes/admin.route.js'
import songRoutes from './routes/songs.route.js'
import albumRoutes from './routes/albums.route.js'
import statsRoutes from './routes/stats.route.js'


dotenv.config();
const __dirname = path.resolve();
const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

app.use(express.json());    // to parse req.body 

app.use(clerkMiddleware())      // this will add auth to req obj => req.auth.userId

app.use(
    fileUplaod({
        useTempFiles: true,
        tempFileDir: path.join(__dirname, "tmp"),
        createParentPath: true,
        limits: {
            fileSize: 10 * 1024 * 1024      // 10mb max file size
        },
    })
);

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/songs', songRoutes)
app.use('/api/albums', albumRoutes)
app.use('/api/stats', statsRoutes)

// error handler routes
app.use((err, req, res, next) => {
    res.status(500).json({ message: process.env.NODE_ENV === 'production' ? "Internal Server Error" : "Internal Server Error : " + err.message, success: false })
})


const PORT = process.env.PORT;
app.listen(PORT, () => {
    connectDb();
    console.log(`Server is running in the port ${PORT}`);
})