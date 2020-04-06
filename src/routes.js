import { Router } from 'express';
import ProductController from './app/controllers/ProductController';
import OrderController from './app/controllers/OrderController';

const routes = new Router();

routes.get('/products', ProductController.index);
routes.post('/products', ProductController.store);
routes.delete('/products/:id', ProductController.destroy);
routes.put('/products/:id', ProductController.update);

routes.get('/orders', OrderController.index);
routes.post('/orders/:product_id', OrderController.store);

export default routes;
