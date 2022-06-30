require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const PORT = process.env.PORT || 3500;
const { logger, logEvents } = require('./middleware/logEvents');
const corsOptions = require('./config/corsOptions');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongdb = require('mongoose');
const connectDb = require('./config/dbCon');

//Connect to db
connectDb();

//custom middleware logger
app.use(logger);

//handle options credentials check - before Cors!
app.use(credentials);

//Cross Origin Resource Sharing
app.use(cors(corsOptions));

//built-in middleware to handle urlenconded data
app.use(express.urlencoded({ extended: false }));

//build-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use(express.static(path.join(__dirname, '/public')));

//routes
app.use('/', require('./routes/root'));
app.use('/register', require('./routes/reguser'));
app.use('/login', require('./routes/login'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));

app.use(verifyJWT);
app.use('/articles', require('./routes/api/articles'));
app.use('/users', require('./routes/api/users'));


app.all('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
});
mongdb.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})