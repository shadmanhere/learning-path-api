import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth';
import {
  signup,
  signin,
  checkUsername,
  deleteUser,
  forgotPassword,
  getResetPassword,
  getUserDetails,
  getUserProfile,
  getUsers,
  logout,
  updatePassword,
  updateProfile,
  updateUserDetails,
} from '../controllers/user';
import { Role } from '../types/user';

const router = express.Router();

router.route('/me').get(isAuthenticated, getUserProfile);
router.route('/me/update').put(isAuthenticated, updateProfile);
router.post('/signup', signup);
router.post('/checkUsername', checkUsername);
router.post('/signin', signin);
router.route('/logout').get(logout);
router.route('/forgot').post(forgotPassword);
router.route('/password/update').put(isAuthenticated, updatePassword);
router.route('/password/reset/:token').put(getResetPassword);

//admin route
router.route('/admin/users').get(isAuthenticated, authorizeRoles(Role.ADMIN), getUsers);

router
  .route('/admin/user/:id')
  .get(isAuthenticated, authorizeRoles(Role.ADMIN), getUserDetails)
  .put(isAuthenticated, authorizeRoles(Role.ADMIN), updateUserDetails)
  .delete(isAuthenticated, authorizeRoles(Role.ADMIN), deleteUser);

export default router;
