import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth';
import { getRandomTutorials, getTutorial, addTutorial, updateTutorial } from '../controllers/tutorial';
import { Role } from '../types/user';

const router = express.Router();

router.route('/random').get(getRandomTutorials);
router.route('/:videoId').get(isAuthenticated, getTutorial);
router.route('/new').post(isAuthenticated, authorizeRoles(Role.ADMIN), addTutorial);
router.route('/update').put(isAuthenticated, authorizeRoles(Role.ADMIN), updateTutorial);
export default router;
