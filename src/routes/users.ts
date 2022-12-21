import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth';
import { getUserProfile, getUsers } from '../controllers/user';
import { signup } from '../controllers/user';
import { signin } from '../controllers/user';
import { Role } from '../types/user';

const router = express.Router();

router.route('/admin/users').post(isAuthenticated, authorizeRoles(Role.ADMIN), getUsers);
router.route('/me').get(isAuthenticated, getUserProfile);
router.post('/signup', signup);
router.post('/signin', signin);

export default router;
