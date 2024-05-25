import Joi from 'joi';
import { RequestHandler } from 'express';
import { error } from '../../utils/response.js';


const createRsvp: RequestHandler = async (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().optional(),
        phone: Joi.string().optional(),
        eventId: Joi.string().optional(),
    }).or('phone', 'email');
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (err) {
        res.status(400).json(error(err.details[0].message, 400));
    }
}


export default {
    createRsvp
}