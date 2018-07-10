const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
require('dotenv').config();
const checkForSession = require('./middlewares/checkForSession');
const swagC = require('./controllers/swag_controller');
const authC = require('./controllers/auth_controller');
const cartC = require('./controllers/cart_controller');
const searchC = require('./controllers/search_controller');

const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false, 
    resave: false
}));
app.use( checkForSession );
app.use(express.static(`${__dirname}/build`));

app.get('/api/swag', swagC.read);
app.post('/api/login', authC.login);
app.post('/api/register', authC.register);
app.post('/api/signout', authC.signout);
app.get('/api/user', authC.getUser);

// Cart
app.post('/api/cart', cartC.add);
app.post('/api/cart/checkout', cartC.checkout);
app.delete('/api/cart', cartC.delete);

// Search
app.get('/api/search', searchC.search);

const port = 3000
app.listen(port, () => console.log(`Server is listening on ${port}`))