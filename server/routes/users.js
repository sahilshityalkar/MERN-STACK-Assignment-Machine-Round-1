import express from 'express';
import { saveUserData } from '../controllers/userController.js'; // Ensure the file and export match

const router = express.Router();

// Route to save or update user data
router.post('/saveUserData', saveUserData);

export default router;
