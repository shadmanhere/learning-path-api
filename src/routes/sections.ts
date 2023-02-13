import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth';
import { addSection, updateSection, getAllSection } from '../controllers/section';
import { Role } from '../types/user';

const router = express.Router();

router.route('/').get(isAuthenticated, authorizeRoles(Role.ADMIN), getAllSection);
router.route('/new').post(isAuthenticated, authorizeRoles(Role.ADMIN), addSection);
router.route('/update').put(isAuthenticated, authorizeRoles(Role.ADMIN), updateSection);

export default router;
