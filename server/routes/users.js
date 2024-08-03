import express from 'express';
const router = express.Router();
import { registerUser, updateUserProfile } from '../controllers/userController.js';
import { clerkAuthMiddleware } from '../middleware/authMiddleware.js';

router.post('/register', registerUser);
router.put('/:id', clerkAuthMiddleware, updateUserProfile);

export default router;
