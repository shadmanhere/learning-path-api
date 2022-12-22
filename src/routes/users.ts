import express from 'express';
import { isAuthenticated } from '../middlewares/auth';
import { forgotPassword, getResetPassword, getUserProfile, logout, updatePassword, updateProfile } from '../controllers/user';
import { signup } from '../controllers/user';
import { signin } from '../controllers/user';

const router = express.Router();

router.route('/me').get(isAuthenticated, getUserProfile);
router.route('/me/update').put(isAuthenticated, updateProfile);
router.post('/signup', signup);
router.post('/signin', signin);
router.route('/logout').get(logout);
router.route('/forgot').post(forgotPassword);
router.route('/password/update').put(isAuthenticated, updatePassword);
router.route('/password/reset/:token').put(getResetPassword);

export default router;
