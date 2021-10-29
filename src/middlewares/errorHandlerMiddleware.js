const errorHandler = (error, req, res) => {
  if (error) {
    res.locals.errors = [error];

    res.status(404).render('404');
  }
};

const errorHandlerMiddleware = {
  errorHandler,
};

module.exports = errorHandlerMiddleware;
