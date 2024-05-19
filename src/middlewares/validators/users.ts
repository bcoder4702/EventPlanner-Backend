import Joi from 'joi';
import { RequestHandler } from 'express';
// import { error } from '../../utils/response.js';

export const createOrUpdateUser: RequestHandler = async () => {
  // Define the common part of the schema
  return Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(3).required()
  });
};
