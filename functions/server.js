const colors = require('colors');
const serverless = require('serverless-http');
const app = require('./app');

const PORT = process.env.PORT || 5000;

// app.listen(PORT, console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`.yellow.bold));

exports.handler = serverless(app);

// const server = awsServerlessExpress.createServer(app);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
})
