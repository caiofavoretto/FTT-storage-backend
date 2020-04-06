import { Router } from 'express';
const ProductController = require('./app/Controller/ProductController');

const routes = new Router();

routes.get('/products', ProductController.index);
routes.post('/products', ProductController.store);
routes.delete('/products', ProductController.destroy);
routes.update('/products', ProductController.update);

export default routes;
