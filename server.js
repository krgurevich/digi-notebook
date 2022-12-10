// Require dependencies
const express = require("express");
const path = require("path");
const apiRoutes = require("./routes/apiRoutes");
const htmlRoutes = require("./routes/htmlRoutes");

// Initialize the app and create a port variable
const app = express();
const PORT = process.env.PORT || 3001;

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.use("/api/notes", apiRoutes);

// Create server listener
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
