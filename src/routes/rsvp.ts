import {Router} from 'express';
import {createRsvp} from '../controllers/rsvp.js';
import validators from '../middlewares/validators/rsvp.js';

const router = Router();

// Route for making a new rsvp
router.post('/', validators.createRsvp, createRsvp);



export default router;