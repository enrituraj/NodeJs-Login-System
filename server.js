require('dotenv').config()
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const methodOverride = require('method-override')
const path = require('path')
const app = express();
require('./models/conn')

// Passport Config
require('./routes/passport')(passport);

const staticpath = path.join(__dirname, "./public");
app.use(express.static(staticpath));
app.use(methodOverride('_method'))

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge: 1000 * 60 * 60 * 24
        },
    })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

app.use('/', require('./routes/index'));

app.get('*', (req, res) => {
    res.send('<h1>Error</h1>')
})

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running on  ${PORT}. http://localhost:${PORT}/`));
