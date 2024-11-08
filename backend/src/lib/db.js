import mongoose from 'mongoose';

export const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB_URI)
        console.log(`Connected to the mongodb database : `, conn.connection.host)
    } catch (error) {
        console.log("Error connecting to the database : ", error.message)
        process.exit(1);       // 1 is failure and 0 is success message
    }
}