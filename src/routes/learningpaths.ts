import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth';
import { addPath, getPath, getPaths, updatePath } from '../controllers/learningpath';
import { Role } from '../types/user';

const router = express.Router();

router.route('/').get(getPaths);
router.route('/:pathname').get(isAuthenticated, getPath);
router.route('/new').post(isAuthenticated, authorizeRoles(Role.ADMIN), addPath);
router.route('/update').put(isAuthenticated, authorizeRoles(Role.ADMIN), updatePath);

export default router;
