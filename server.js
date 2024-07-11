const express = require('express');
const path = require('path');
const app = express();

// Middleware to check if it's working hours (Monday to Friday, 9am to 5pm)
const workingHoursMiddleware = (req, res, next) => {
    const date = new Date();
    const dayOfWeek = date.getDay();
    const hour = date.getHours();

    // Check if it's Monday to Friday and between 9am to 5pm
    if (dayOfWeek >= 1 && dayOfWeek <= 5 && hour >= 9 && hour < 17) {
        next(); // Continue to the next middleware or route handler
    } else {
        res.send('Our services are only available during working hours (Monday to Friday, 9am to 5pm).');
    }
};

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use EJS as the view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Routes
app.get('/', workingHoursMiddleware, (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/services', workingHoursMiddleware, (req, res) => {
    res.render('services', { title: 'Our Services' });
});

app.get('/contact', workingHoursMiddleware, (req, res) => {
    res.render('contact', { title: 'Contact Us' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
