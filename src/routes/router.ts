import express from 'express';
import { getTimeToken, login, updateToken, getAllUsers, saveUser, updateUser, deleteUser} from '../controllers/auth.controller';

const routes = express.Router();

routes.post('/access', login as express.RequestHandler );

routes.get('/time/:userId', getTimeToken);

routes.patch('/update/:userId', updateToken)

routes.get('/find', getAllUsers);

routes.post('/add', saveUser);

routes.patch('/update', updateUser);

routes.patch('/delete', deleteUser)

export default routes;