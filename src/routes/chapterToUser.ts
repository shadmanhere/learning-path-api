import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth';
import { addChapterToUser, updateChapterToUser } from '../controllers/chapterToUser';
import { Role } from '../types/user';

const router = express.Router();

router.route('/new').post(isAuthenticated, authorizeRoles(Role.ADMIN), addChapterToUser);
router.route('/update').put(isAuthenticated, authorizeRoles(Role.ADMIN), updateChapterToUser);

export default router;
