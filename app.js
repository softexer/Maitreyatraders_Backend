var createError = require('http-errors');
var express = require('express');
var compression = require('compression')
var pinohttp = require('pino-http')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
require("dotenv").config();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var Customer = require('./routes/Customer');
var cart = require('./routes/Cart');
var contactus = require('./routes/contactus');
var customeraddress = require('./routes/customeraddress');
var Vmartaddress = require('./routes/vmartaddress');
var Categories = require('./routes/Category');
var seller = require('./routes/Seller');
var sellerProducts = require('./routes/sellerProducts');
var dashboard = require('./routes/dashboard');
var dailydeals = require('./routes/DailyDeals');
var orders = require('./routes/orders');
var whishlist = require('./routes/whishlist');
var product_List = require('./routes/Products');
var Admin = require('./routes/Admin');
var Payment = require('./routes/payment');
var Promotions = require('./routes/Promotion')


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(compression())
// app.use(pinohttp())
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({ origin: true }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/customer', Customer);
app.use('/api/CartData', cart);
app.use('/api/contactus', contactus);
app.use('/api/CustomerAddress', customeraddress);
app.use('/api/VmartAddress', Vmartaddress);
app.use('/api/categories', Categories);
app.use('/api/seller', seller);
app.use('/api/sellerProducts', sellerProducts);
app.use('/api/dashboard', dashboard);
app.use('/api/todaydeals', dailydeals);
app.use('/api/orders', orders);
app.use('/api/whishlist', whishlist);
app.use('/api/product', product_List);
app.use('/api/admin', Admin);
app.use('/api/payment', Payment);
app.use('/api/promotion', Promotions)






// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
