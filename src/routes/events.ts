import { Router } from 'express';
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEventById,
  deleteEventById
} from '../controllers/events.js';

const router = Router();

//  events with Organizer, Vendor, Guest id
// /api/events?entityId=1234&entityType=ORGANIZER

// getEvent with id
// /api/events/1234

router.post('/', createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.put('/:id', updateEventById);
router.delete('/:id', deleteEventById);

export default router;
