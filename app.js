//Handle Syntax Error
process.on('uncaughtException', (err) => {
    console.log('UncaughtException', err);
})
//----------------------------------------------------------------

const express = require('express');
const app = express();
const morgan = require('morgan');
require('dotenv').config({ path: './config/.env' })

const { dbConnection } = require('./src/database/dbConnection.js');
const AppError = require('./src/utils/AppError.js');
const globalMiddlewareErr = require('./src/utils/globalMiddlewareErr.js');

const port = process.env.PORT || 4000

//MiddleWares
app.use(express.json())

app.use('/categories',
    require('./src/component/category/category.api.js'))
if (process.env.MODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/subcategories',
    require('./src/component/subcategory/subcategory.api.js'))
if (process.env.MODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/brands',
    require('./src/component/brand/brand.api.js'))
if (process.env.MODE_ENV === 'development') {
    app.use(morgan('dev'))
}

app.use('/products',
    require('./src/component/product/product.api.js'))
if (process.env.MODE_ENV === 'development') {
    app.use(morgan('dev'))
}


//Handle unhandled Route Requests
app.all("*", (req, res, next) => {
    // res.json({ msg: `Can't Find This Route ${req.originalUrl} On Server` }) // Old Way 

    //Creating new class with our properties as we need them 
    next(new AppError(`Can't Find This Route ${req.originalUrl} On Server`, 404))
})

//Handle Error handling MiddleWare
app.use(globalMiddlewareErr)


dbConnection()
app.listen(port, () => { console.log(`Server is running on port ${port}`) })

//Handle Rejection Errors
process.on('unhandledRejection', (err) => {
    console.log('unhandledRejection', err);
})