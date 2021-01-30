const serverless = require('serverless-http');
const app = require('./app');
const port = require('./config/keys').PORT;
const NODE_ENV = require('./config/keys').NODE_ENV;

const PORT = port || 5000;

// const server = app.listen(PORT, console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold));

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);
    // Close server & exit process
    server.close(() => process.exit(1));
})

module.exports = serverless(app);
