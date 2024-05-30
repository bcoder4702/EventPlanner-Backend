import { RequestHandler } from 'express';
import { success, error } from '../utils/response.js';
import { Timestamp } from 'firebase/firestore';
import { createBudgetQuery,getBudgetByIdQuery, getBudgetsByEventIdQuery } from '../services/budgets.js';

export const createBudget : RequestHandler = async (req, res) => {
    try {
        const data = {
            ...req.body,
            createdAt: Timestamp.fromDate(new Date()),
        };
        const docId = await createBudgetQuery(data); 
        res.status(200).json(success('Budget created successfully', docId, 200));
    } catch (err) {
        res.status(500).json(error('Something went wrong!', 500));
    }
};

export const getBudgetById: RequestHandler = async (req, res) => {
    try {
        const id = req.params.id;
        const budget = await getBudgetByIdQuery(id);
        if (budget) {
            res.status(200).json(success('Budget retrieved successfully', budget, 200));
        } else {
            res.status(404).json(error('No budget found of provided id', 404));
        }
    } catch (err) {
        res.status(500).json(error('Something went wrong!', 500));
    }
};


export const getBudgetsByEventId: RequestHandler = async (req, res) => {
    try {
        const eventId = req.params.eventId;
        const budgets = await getBudgetsByEventIdQuery(eventId);
        res.status(200).json(success('Budgets retrieved successfully', budgets, 200));
    } catch (err) {
        res.status(500).json(error('Something went wrong!', 500));
    }
}