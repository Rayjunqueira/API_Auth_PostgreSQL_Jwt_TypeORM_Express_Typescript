import { Router } from 'express';

import ActivateUser from '../controllers/ActivateUser';
import AuthUser from '../controllers/AuthUser';
import ForgotPassword from '../controllers/ForgotPassword';
import ResetPassword from '../controllers/ResetPassword';

const router = Router();

router.post('/activate', ActivateUser.execute);
router.post('/', AuthUser.store);
router.post('/forgotpass', ForgotPassword.execute);
router.post('/resetpass', ResetPassword.execute);

export default router;