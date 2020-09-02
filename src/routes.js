import { Router } from 'express';
import Cliente from './app/models/Cliente';

import ClienteController from './app/controllers/ClienteController';

const routes = new Router();

routes.post('/cliente', ClienteController.store);
routes.put('/clientes/:id', ClienteController.update);
routes.get('/clientes/:id', ClienteController.show);
routes.get('/clientes', ClienteController.index);
routes.delete('/clientes/:id', ClienteController.delete);

export default routes;
