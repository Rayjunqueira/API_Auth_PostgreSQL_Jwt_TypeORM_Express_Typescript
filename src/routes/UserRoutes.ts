import { Router } from 'express';

import CreateUser from '../controllers/CreateUser';
import UpdateUser from '../controllers/UpdateUser';
import DeleteUser from '../controllers/DeleteUser';

import authMiddleware from '../middlewares/AuthMiddlewares';

const router = Router();

router.post('/', CreateUser.store);
router.put('/:id', authMiddleware, UpdateUser.update);
router.delete('/:id', authMiddleware, DeleteUser.delete);

export default router;