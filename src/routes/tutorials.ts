import express from 'express';
import { getRandomTutorials } from '../controllers/tutorial';

const router = express.Router();

router.route('/random').get(getRandomTutorials);
export default router;
