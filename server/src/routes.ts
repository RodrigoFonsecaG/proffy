import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionController from './controllers/ConnectionController';
import UsersController from './controllers/UsersController';

const routes = express.Router();

const classesController = new ClassesController();
const connectionsController = new ConnectionController();
const usersController = new UsersController();

routes.post('/classes', classesController.create);
routes.get('/classes', classesController.index);

routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);

routes.post('/register', usersController.create);

export default routes;
