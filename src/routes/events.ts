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

//  events with Organizer, Vendor, Guest id
// /api/events?entityId=1234&entityType=ORGANIZER

// getEvent with id
// /api/events/1234

router.post('/',validators.createEvent,createEvent);
// router.get('/', getAllEvents);
router.get('/:id',validators.getEventById, getEventById);
router.put('/:id',validators.updateEventById, updateEventById);
router.delete('/:id',validators.deleteEventById, deleteEventById);

export default router;
