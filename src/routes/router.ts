import express from 'express';
import { getTimeToken, login, updateToken, getAllUsers, saveUser, updateUser} from '../controllers/auth.controller.ts';

const routes = express.Router();

routes.post('/login', login );

routes.get('/time/:userId', getTimeToken);

routes.patch('/update/:userId', updateToken)

routes.get('/find', getAllUsers);

routes.post('/add', saveUser);

routes.patch('/update', updateUser);

export default routes;