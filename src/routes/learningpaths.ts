import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth';
import { addPath, getPath, getPaths } from '../controllers/learningpath';
import { Role } from '../types/user';

const router = express.Router();

router.route('/').get(getPaths);
router.route('/:pathname').get(getPath);
router.route('/new').post(isAuthenticated, authorizeRoles(Role.ADMIN), addPath);

export default router;
