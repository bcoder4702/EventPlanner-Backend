import Joi from 'joi';
import { RequestHandler } from 'express';
import { error } from '../../utils/response.js';

const createUser: RequestHandler = async (req, res, next) => {
  // Define the common part of the schema
  const schema = Joi.object({
    phone: Joi.string().optional(),
    email: Joi.string().email().optional(),
    // password: Joi.string().min(6).required(),
    name: Joi.string().min(3).required(),
    photo: Joi.string().optional(),
    role: Joi.string().valid('ORGANIZER', 'VENDOR', 'GUEST').required(),
    events: Joi.array().items(Joi.string()).optional(),
    deleted: Joi.boolean().optional()
  }).or('phone', 'email');
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(400).json(error(err.details[0].message, 400));
  }
};

const getUserWithId: RequestHandler = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().alphanum().required()
  });
  try {
    await schema.validateAsync(req.params);
    next();
  } catch (err) {
    res.status(400).json(error(err.details[0].message, 400));
  }
};

const updateUser: RequestHandler = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required(),
    email: Joi.string().email(),
    password: Joi.string().min(6),
    name: Joi.string().min(3)
  });
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (err) {
    res.status(400).json(error(err.details[0].message, 400));
  }
};

const deleteUser: RequestHandler = async (req, res, next) => {
  const schema = Joi.object({
    id: Joi.string().required()
  });
  try {
    await schema.validateAsync(req.params);
    next();
  } catch (err) {
    res.status(400).json(error(err.details[0].message, 400));
  }
};

export default {
  createUser,
  getUserWithId,
  updateUser,
  deleteUser
};
