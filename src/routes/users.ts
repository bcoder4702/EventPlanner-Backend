import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserWithId,
  updateUser,
  deleteUser
} from '../controllers/users.js';
import validators from '../middlewares/validators/users.js';

const router = Router();


//phone/email-name-role-
// Route for making a new user - ORGANIZER, VENDOR, GUEST
router.post('/', validators.createUser, createUser);
router.get('/:id', validators.getUserWithId, getUserWithId);
router.patch('/:id', validators.updateUser, updateUser);
router.delete('/:id', validators.deleteUser, deleteUser);

export default router;
