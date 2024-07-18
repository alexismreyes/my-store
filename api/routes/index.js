const express = require('express');

const categoriesRouter = require('./categories.router');
const productsRouter = require('./products.router');
const usersRouter = require('./users.router');



function routerApi(app){
  const router = express.Router();
  app.use('/api/v1',router);

  router.use('/categories',categoriesRouter);
  router.use('/products',productsRouter);
  router.use('/users',usersRouter);

    //si tuviesemos otros clientes podriamos crear otra version de endpoints o por modificaciones que implique varios cambios
    //app.use('/api/v2',router);
    //router.use('/categories'); //esto nos daria por endpoint http://localhost/api/v2/categories
}

module.exports = routerApi;
