import express from 'express';
import { getPath, getPaths } from '../controllers/learningpath';
const router = express.Router();

router.route('/').get(getPaths);
router.route('/:pathname').get(getPath);

export default router;
