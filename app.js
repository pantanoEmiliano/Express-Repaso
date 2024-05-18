var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.get('/search', (req, res) => {
  const searchQuery = req.query.q.toLowerCase();
  fs.readFile(path.join(__dirname, 'data', 'data.json'), 'utf8', (err, data) => {
      if (err) {
          return res.status(500).send('Error reading data file');
      }
      const jsonData = JSON.parse(data);
      const results = jsonData.filter(item => 
          item.name.toLowerCase().includes(searchQuery) ||
          item.description.toLowerCase().includes(searchQuery) ||
          item.genre.toLowerCase().includes(searchQuery) ||
          item.director.toLowerCase().includes(searchQuery)
      );
      res.json(results);
  });
});


module.exports = app;
