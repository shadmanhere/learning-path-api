import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth';
import { addCategoryToLearningPath, updateCategoryToLearningPath } from '../controllers/categoryToLearningpath';
import { Role } from '../types/user';

const router = express.Router();

router.route('/new').post(isAuthenticated, authorizeRoles(Role.ADMIN), addCategoryToLearningPath);
router.route('/update').put(isAuthenticated, authorizeRoles(Role.ADMIN), updateCategoryToLearningPath);

export default router;
