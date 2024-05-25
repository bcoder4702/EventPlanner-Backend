import { RequestHandler } from 'express';
// import { createRSVPQuery } from '../services/users';
import { success, error } from '../utils/response';
import { Timestamp } from 'firebase/firestore';
import { createRSVPQuery } from '../services/rsvps';



export const createRsvp: RequestHandler = async (req, res) => {
    try {
        const data = {
            ...req.body,
            createdAt: Timestamp.fromDate(new Date()),
        };
        const docId = await createRSVPQuery(data);
    
        // returning the id of the created user
        res.status(200).json(success('RSVP created successfully', docId, 200));
    } catch (e) {
        res.status(500).json(error('Something went wrong!', 500));
    }
};