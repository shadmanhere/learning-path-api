import express from 'express';
import { getUsers } from '../controllers/user';
import { signup } from '../controllers/user';

const router = express.Router();

router.get('/', getUsers);
router.post('/signup', signup);

export default router;
