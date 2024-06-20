import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const DBConnection = async () => {
    const MONGO_URI = process.env.MONGO_URI; // Assuming you set this environment variable in your .env file

    try {
        await mongoose.connect(MONGO_URI);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Error while connecting with the database: ', error.message);
        process.exit(1); // Exit process with failure
    }
}

// Properly handle termination signals to close database connection
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Database connection closed due to application termination');
    process.exit(0);
});

export default DBConnection;
