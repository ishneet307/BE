const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to log request details
app.use((req, res, next) => {
  const logDetails = {
    timestamp: new Date().toISOString(),
    ip: req.ip,
    url: req.originalUrl,
    protocol: req.protocol,
    method: req.method,
    hostname: req.hostname,
  };

  // Create a log entry string
  const logEntry = `${logDetails.timestamp} | IP: ${logDetails.ip} | URL: ${logDetails.url} | Protocol: ${logDetails.protocol} | Method: ${logDetails.method} | Hostname: ${logDetails.hostname}\n`;

  // Define the log file path
  const logFilePath = path.join(__dirname, 'requests.log');

  // Append log entry to the file
  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Failed to write log entry:', err);
    }
  });

  next();
});

// Example routes
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
