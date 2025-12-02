import express from 'express'
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Simple test route
app.get("/", (req, res) => {
  res.send("Backend is working! 🚀");
});

// Start server
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
