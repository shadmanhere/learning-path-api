import express from 'express';
import { getRandomTutorials, getTutorial } from '../controllers/tutorial';

const router = express.Router();

router.route('/random').get(getRandomTutorials);
router.route('/:videoId').get(getTutorial);
export default router;
