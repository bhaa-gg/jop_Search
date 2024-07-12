// Handle uncaught exceptions to prevent crashes and log the error
process.on("uncaughtException", (err) => {
    console.log(`Code Error : ${err}`);
});

import { config } from 'dotenv'
import express from 'express'
import path from 'path';
import cors from 'cors'

// Import custom error utility
import { ErrorApp } from './src/Utils/ErrorApp.utils.js';
// Import the database connection module
import { dbConnection } from './DB/connection.js';
// Import route modules
import userRoutes from './src/Modules/User/user.routes.js';
import companyRoutes from './src/Modules/Company/company.routes.js';
import jobRoutes from './src/Modules/Job/jop.routes.js';
import ApplicationRoutes from './src/Modules/Application/applocation.routes.js';

// Load environment variables
config()
const app = express()
const port = process.env.PORT


app.use(cors())

// Use JSON middleware for parsing JSON bodies
app.use(express.json());
// Define routes for different modules
app.use("/user", userRoutes);
app.use("/company", companyRoutes);
app.use("/job", jobRoutes);
app.use("/application", ApplicationRoutes);

// Establish database connection
dbConnection();

// Define a simple route for the root URL
app.get('/', (req, res) => res.send('Hello World!'))

// Handle undefined routes with a custom error
app.use("/*", (req, res, next) => {
    return next(new ErrorApp("Page not found", 404, path.resolve()))
})

// Error handling middleware
app.use((err, req, res, next) => {
    let messageErr = err.message || "Error"
    let statuscode = err.statusCode || 500
    let stack = err.stack || "Error from modules"
    res.status(statuscode).json({ message: "Fail response", messageErr, stack })
})

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
    console.log(err);
})

// Start the server and listen on the specified port
app.listen(port, () => console.log(`Example app listening on port ${port}!`))
