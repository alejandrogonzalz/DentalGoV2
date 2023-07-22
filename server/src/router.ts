import { Router } from 'express';
import { handleNewUser, getAllUsers } from './controllers/users/userController';
import { router as authRouter } from './controllers/auth/authController';

const router = Router();

// --------- User routes ---------- //
router.post('/create-user', handleNewUser);
router.get('/getAllUsers', getAllUsers);

// --------- auth routes ---------- //
router.use('/auth', authRouter);

export default router;
