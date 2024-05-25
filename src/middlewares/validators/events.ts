import Joi from 'joi';
import { RequestHandler } from 'express';
import { error } from '../../utils/response.js';
import { time } from 'console';


const createEvent: RequestHandler = async (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        date: Joi.date().required(),
        description: Joi.string().min(10).required(),
        location: Joi.string().optional(),
        organizerId: Joi.string().required(),
        guestList: Joi.array().items(Joi.string()).optional(),
        vendorList: Joi.array().items(Joi.string()).optional(),
        time: Joi.string().optional(),
        theme: Joi.string().optional(),
        venue: Joi.string().optional(),
        colortheme: Joi.string().optional(),
        deleted: Joi.boolean().optional()
    });
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (err) {
        res.status(400).json(error(err.details[0].message, 400));
    }
};

/*const getAllEvents: RequestHandler = async (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().required()
    });
    try {
        await schema.validateAsync(req.params);
        next();
    } catch (err) {
        res.status(400).json(error(err.details[0].message, 400));
    }
};*/

const getALLEvents: RequestHandler = async (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().optional()
    });
    try {
        await schema.validateAsync(req.params);
        next();
    } catch (err) {
        res.status(400).json(error(err.details[0].message, 400));
    }
}

const getEventById: RequestHandler = async (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().required()
    });
    try {
        await schema.validateAsync(req.params);
        next();
    } catch (err) {
        res.status(400).json(error(err.details[0].message, 400));
    }
}

const updateEventById: RequestHandler = async (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).optional(),
        description: Joi.string().min(10).optional(),
        date: Joi.date().optional(),
        venue: Joi.string().optional(),
        organizer: Joi.string().optional(),
        vendors: Joi.array().items(Joi.string()).optional(),
        guests: Joi.array().items(Joi.string()).optional(),
        deleted: Joi.boolean().optional(),
        theme: Joi.string().optional()
    });
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (err) {
        res.status(400).json(error(err.details[0].message, 400));
    }
}

const deleteEventById: RequestHandler = async (req, res, next) => {
    const schema = Joi.object({
        id: Joi.string().required()
    });
    try {
        await schema.validateAsync(req.params);
        next();
    } catch (err) {
        res.status(400).json(error(err.details[0].message, 400));
    }
}

export default {
    createEvent,
    getEventById,
    updateEventById,
    deleteEventById,
    getALLEvents
};