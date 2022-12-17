import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth';
import { getUsers } from '../controllers/user';
import { signup } from '../controllers/user';
import { signin } from '../controllers/user';
import { Role } from '../types/user';

const router = express.Router();

router.route('/').post(isAuthenticated, authorizeRoles(Role.ADMIN), getUsers);
router.post('/signup', signup);
router.post('/signin', signin);

export default router;
