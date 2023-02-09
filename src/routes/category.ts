import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth';
import { addCategory, updateCategory } from '../controllers/category';
import { Role } from '../types/user';

const router = express.Router();

router.route('/new').post(isAuthenticated, authorizeRoles(Role.ADMIN), addCategory);
router.route('/update').put(isAuthenticated, authorizeRoles(Role.ADMIN), updateCategory);

export default router;
