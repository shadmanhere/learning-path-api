import express from 'express';
import { authorizeRoles, isAuthenticated } from '../middlewares/auth';

import { Role } from '../types/user';
import { deleteUser, getUserDetails, getUsers, updateUserDetails } from '../controllers/admin';

const router = express.Router();

router.route('/users').get(isAuthenticated, authorizeRoles(Role.ADMIN), getUsers);

router
  .route('/user/:id')
  .get(isAuthenticated, authorizeRoles(Role.ADMIN), getUserDetails)
  .put(isAuthenticated, authorizeRoles(Role.ADMIN), updateUserDetails)
  .delete(isAuthenticated, authorizeRoles(Role.ADMIN), deleteUser);

export default router;
