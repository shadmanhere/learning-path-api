import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth';
import { addCategory, updateCategory, getCategory, deleteCategory } from '../controllers/category';
import { Role } from '../types/user';

const router = express.Router();

router.route('/get').get(isAuthenticated, authorizeRoles(Role.ADMIN), getCategory);
router.route('/new').post(isAuthenticated, authorizeRoles(Role.ADMIN), addCategory);
router.route('/update').put(isAuthenticated, authorizeRoles(Role.ADMIN), updateCategory);
router.route('/delete/:id').delete(isAuthenticated, authorizeRoles(Role.ADMIN), deleteCategory);

export default router;
