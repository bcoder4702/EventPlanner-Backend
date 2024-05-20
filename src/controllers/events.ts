import { RequestHandler } from 'express';
import { success, error } from '../utils/response.js';
import { Timestamp } from 'firebase/firestore';

export const createEvent: RequestHandler = async (req, res) => {};

export const getAllEvents: RequestHandler = async (req, res) => {};

export const getEventById: RequestHandler = async (req, res) => {};

export const updateEventById: RequestHandler = async (req, res) => {};

export const deleteEventById: RequestHandler = async (req, res) => {};
