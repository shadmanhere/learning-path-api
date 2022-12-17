import express from 'express';
import { isAuthenticated } from '../middlewares/auth';
import { getUsers } from '../controllers/user';
import { signup } from '../controllers/user';
import { signin } from '../controllers/user';

const router = express.Router();

router.route('/').post(isAuthenticated, getUsers);
router.post('/signup', signup);
router.post('/signin', signin);

export default router;
