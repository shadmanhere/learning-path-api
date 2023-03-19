import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth';
import { getChapters, updateChapter, addChapter, deleteChapter } from '../controllers/chapters';
import { Role } from '../types/user';

const router = express.Router();

router.route('/').get(isAuthenticated, getChapters);
router.route('/new').post(isAuthenticated, authorizeRoles(Role.ADMIN), addChapter);
router.route('/update').put(isAuthenticated, authorizeRoles(Role.ADMIN), updateChapter);
router.route('/delete/:id').delete(isAuthenticated, authorizeRoles(Role.ADMIN), deleteChapter);

export default router;
