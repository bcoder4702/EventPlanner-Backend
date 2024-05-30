import Joi from 'joi';
import { RequestHandler } from 'express';
import { error } from '../../utils/response.js';

const createBudget: RequestHandler = async (req, res, next) => {
    const schema = Joi.object({
        eventId: Joi.string().required(),
        vendorId: Joi.string().required(),
        totalBudget: Joi.number().required(),
        allocatedBudget: Joi.number().optional(),
        deleted: Joi.boolean().optional(),
        createdAt: Joi.date().optional()
    });
    try {
        await schema.validateAsync(req.body);
        next();
    } catch (err) {
        res.status(400).json(error(err.details[0].message, 400));
    }
}


// const getBudgetById: RequestHandler = async (req, res, next) => {
//     const schema = Joi.object({
//         id: Joi.string().required()
//     });
//     try {
//         await schema.validateAsync(req.params);
//         next();
//     } catch (err) {
//         res.status(400).json(error(err.details[0].message, 400));
//     }
// }

const getBudgetsByEventId: RequestHandler = async (req, res, next) => {
    const schema = Joi.object({
        eventId: Joi.string().required()
    });
    try {
        await schema.validateAsync(req.params);
        next();
    } catch (err) {
        res.status(400).json(error(err.details[0].message, 400));
    }
}

export default { createBudget, getBudgetsByEventId};