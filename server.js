// Require dependancies
const express = require('express');
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Initialize the app and create a port variable
const app = express();
const PORT = process.env.PORT || 3001;

// Set up express to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/api', htmlRoutes);

// Create server listener
app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
});
