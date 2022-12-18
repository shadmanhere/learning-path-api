import express from 'express';
import { getPaths } from '../controllers/learningpath';
const router = express.Router();

router.route('/').get(getPaths);

export default router;
