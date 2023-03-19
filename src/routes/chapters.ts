import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth';
import { getChapters } from '../controllers/chapters';
import { Role } from '../types/user';

const router = express.Router();

router.route('/').get(isAuthenticated, getChapters);

export default router;
