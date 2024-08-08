require('dotenv').config();
const express = require ('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const passport = require('passport')
const compression = require('express-compression');
const { mongoUri, dbName } = require('./config');
const session = require('express-session')
const productRoutes = require('./routes/product.router');
const CartRoutes = require('./routes/cart.router');
const MongoStore = require('connect-mongo');
const userRoutes = require('./routes/user.router');
const exphbs = require('express-handlebars');
const { initializePassport } = require('./config/passport');

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(compression({
    brotli: { enabled: true, zlib: {} }
}));

app.use(express.json());
app.use(express.static(`${__dirname}/public`));


app.use(session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitiliazed: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        ttl: 7 * 24 * 60 * 60
    })
}));


initializePassport();
app.use(passport.initilize());
app.use(passport.session());


app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);
app.use('/api/user', userRoutes);

const main = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI ,{ dbName: process.env.DB_NAME });
        console.log('MongoDB connected...');

        const PORT = process.env.PORT || 8080;
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

main();
