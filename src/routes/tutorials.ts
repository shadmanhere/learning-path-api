import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth';
import { getAllTutorials, getRandomTutorials, getTutorial, addTutorial, updateTutorial, deleteTutorial } from '../controllers/tutorial';
import { Role } from '../types/user';

const router = express.Router();

router.route('/random').get(getRandomTutorials);
router.route('/all').get(isAuthenticated, getAllTutorials);
router.route('/:videoId').get(isAuthenticated, getTutorial);
router.route('/new').post(isAuthenticated, authorizeRoles(Role.ADMIN), addTutorial);
router.route('/update').put(isAuthenticated, authorizeRoles(Role.ADMIN), updateTutorial);
router.route('/delete/:id').delete(isAuthenticated, authorizeRoles(Role.ADMIN), deleteTutorial);
export default router;
