import express from 'express';
import { isAuthenticated } from '../middlewares/auth';
import { getRandomTutorials, getTutorial } from '../controllers/tutorial';

const router = express.Router();

router.route('/random').get(isAuthenticated, getRandomTutorials);
router.route('/:videoId').get(isAuthenticated, getTutorial);
export default router;
