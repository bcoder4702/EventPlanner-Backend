import { RequestHandler } from 'express';
import { success, error } from '../utils/response.js';
import { Timestamp } from 'firebase/firestore';
import { createEventQuery,getAllEventsQuery,getEventByIdQuery,updateEventQuery,deleteEventQuery } from '../services/events.js';
import { getRSVPsQuery } from '../services/rsvps.js';

export const createEvent: RequestHandler = async (req, res) => {
    try {
        const data = {
            ...req.body,
            createdAt: Timestamp.fromDate(new Date()),
        };
        const docId = await createEventQuery(data);
        res.status(200).json(success('Event created successfully', docId, 200));
    } catch (err) {
        res.status(500).json(error('Something went wrong!', 500));
    }
};

export const getAllEvents: RequestHandler = async (req, res) => {
    try {
        const { roletype, roleid } = req.query;
        // console.log(roletype, roleid)
        const events = await getAllEventsQuery(roleid as string, roletype as string);
        if (!events) {
            res.status(404).json(error('No events found', 404));
        } else {
            res.status(200).json(success('Events retrieved successfully', events, 200));
        }
    } catch (err) {
        res.status(500).json(error('Something went wrong!', 500));
    }
};

export const getEventById: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const event = await getEventByIdQuery(id);
        const guests=await getRSVPsQuery(id);
        const entityEvent={
            ...event,
               guestList:guests
        };
        if (event) {
            res.status(200).json(success('Event retrieved successfully', entityEvent, 200));
        } else {
            res.status(404).json(error('No event found of provided id', 404));
        }
    } catch (err) {
        res.status(500).json(error('Something went wrong!', 500));
    }
};

export const updateEventById: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const event = await updateEventQuery(id, req.body);
        res.status(200).json(success('Event updated successfully', event, 200));
    } catch (err) {
        res.status(500).json(error('Something went wrong!', 500));
    }
};

export const deleteEventById: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id;
        await deleteEventQuery(id);
        res.status(200).json(success('Event deleted successfully', null, 200));
    } catch (err) {
        res.status(500).json(error('Something went wrong!', 500));
    }
};
