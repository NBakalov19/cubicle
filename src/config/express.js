const express = require('express');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const path = require('path');

module.exports = (app) => {
  app.use(express.urlencoded({ extended: true }));

  app.use(cookieParser({}));

  //static
  app.use(express.static(path.resolve(__dirname, '../public')));

  //handlebars
  app.set('views', path.resolve(__dirname, '../views'));

  app.engine('hbs', handlebars({ extname: 'hbs' }));

  app.set('view engine', 'hbs');
};
