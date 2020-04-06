import { Router } from 'express';
import ProductController from './app/controllers/ProductController';

const routes = new Router();

routes.get('/products', ProductController.index);
routes.post('/products', ProductController.store);
routes.delete('/products', ProductController.destroy);
routes.put('/products', ProductController.update);

export default routes;
