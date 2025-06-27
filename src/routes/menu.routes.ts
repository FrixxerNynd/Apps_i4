import { Router, RequestHandler } from 'express';
import { getMenuByRole } from '../controllers/menu.controller';

const router = Router();
router.get('/menus', getMenuByRole);

export default router;