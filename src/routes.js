import { Router } from 'express';
import ProductController from './app/controllers/ProductController';
import OrderController from './app/controllers/OrderController';
import CancelOrderController from './app/controllers/CancelOrderController';
import NewPackageController from './app/controllers/NewPackageController';

const routes = new Router();

routes.get('/products', ProductController.index);
routes.post('/products', ProductController.store);
routes.put('/products/:id', ProductController.update);
routes.delete('/products/:id', ProductController.destroy);

routes.put('/new_package/:product_id', NewPackageController.update);

routes.get('/orders', OrderController.index);
routes.post('/orders/:product_id', OrderController.store);

routes.put('/orders/:id', CancelOrderController.update);

export default routes;
