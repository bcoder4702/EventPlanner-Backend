import { Router } from 'express';
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById
} from '../controllers/events.js';
import validators from '../middlewares/validators/events.js';

const router = Router();

// there will be a middleware for verifying the user 

router.post('/',validators.createEvent,createEvent);
router.get('/',validators.getALLEvents,getAllEvents);
router.get('/:id',validators.getEventById, getEventById);
router.put('/:id',validators.updateEventById, updateEventById);
router.delete('/:id',validators.deleteEventById, deleteEventById);

export default router;
