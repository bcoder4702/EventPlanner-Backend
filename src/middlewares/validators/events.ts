import Joi from 'joi';
import { RequestHandler } from 'express';
import { error } from '../../utils/response.js';


const createEvent: RequestHandler = async (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        description: Joi.string().min(10).required(),
        date: Joi.date().required(),
        venue: Joi.string().required(),
        organizer: Joi.string().required(),
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
    deleteEventById
};