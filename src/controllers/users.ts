import { RequestHandler, query } from 'express';
import {
  createUserQuery,
  getUsersQuery,
  getUserWithIdQuery,
  updateUserQuery,
  deleteUserQuery,
  getUserByEmailorPhoneQuery,
  createGuestQuery,
  getGuestByEmailQuery,
  updateGuestQuery
} from '../services/users.js';
import { success, error } from '../utils/response.js';
import { Timestamp, arrayUnion, collection, where } from 'firebase/firestore';
import { db } from '../../database/firebase';
// import { Event } from '../models';
import { updateDoc, doc } from 'firebase/firestore';
import { getEventByIdQuery, updateEventQuery } from '../services/events.js';

export const createUser: RequestHandler = async (req, res) => {
  try {
    const isUser = await getUserByEmailorPhoneQuery(
      req.body.email,
      req.body.phone
    );
    if (isUser) return res.status(400).json(error('User already exists', 400));
    const data = {
      ...req.body,
      createdAt: Timestamp.fromDate(new Date())
    };
    const servicetype = Array.isArray(req.query.servicetype)
      ? req.query.servicetype[0]
      : req.query.servicetype;
    // if (!servicetype) return res.status(400).json(error('Service type is required', 400));
    const docId = await createUserQuery(
      data,
      servicetype as string | undefined
    ); // Convert servicetype to string

    // returning the id of the created user
    res.status(200).json(success('User created successfully', docId, 200));
  } catch (e) {
    res.status(500).json(error('Something went wrong!', 500));
  }
};

export const createGuest: RequestHandler = async (req, res) => {
  try {
    const eventId = req.query.eventid as string;
    const guest = await getGuestByEmailQuery(req.body.email);
    if(guest) { 
      guest.seats = req.body.seats;
      await updateGuestQuery(guest.id, guest);
      const eventDocRef = doc(db, 'events', eventId);
       await updateDoc(eventDocRef, {
      guestList: arrayUnion(guest.id),
    });
    return res.status(200).json({ message: 'Guest updated and event updated successfully' });
    }
    else{
    const data = {
      ...req.body,
      role: 'GUEST',
      createdAt: Timestamp.fromDate(new Date())
    };
    const docId = await createGuestQuery(data);
    const eventDocRef = doc(db, 'events', eventId);
    await updateDoc(eventDocRef, {
      guestList: arrayUnion(docId),
    });
    res
      .status(201)
      .json({ message: 'Guest created and event updated successfully' });
  } 
}catch (e) {
    res.status(500).json(error('Something went wrong!', 500));
  }
};

export const getUsers: RequestHandler = async (req, res) => {
  try {
    const users = await getUsersQuery();
    if (users.length === 0) {
      res.status(404).json(error('No users found', 404));
    } else {
      res.status(200).json(success('Users retrieved successfully', users, 200));
    }
  } catch (error) {
    res.status(500).json(error('Something went wrong!', 500));
  }
};

export const getUserWithId: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await getUserWithIdQuery(id);
    if (user) {
      res.status(200).json(success('User retrieved successfully', user, 200));
    } else {
      res.status(404).json(error('No user found of provided id', 404));
    }
  } catch (error) {
    res.status(500).json(error('Something went wrong!', 500));
  }
};

export const updateUser: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await updateUserQuery(id, req.body);
    res.status(200).json(success('User updated successfully', user, 200));
  } catch (error) {
    res.status(500).json(error('Something went wrong!', 500));
  }
};

export const deleteUser: RequestHandler = async (req, res) => {
  try {
    const id = req.params.id;
    await deleteUserQuery(id);
    res.status(200).json(success('User deleted successfully', null, 200));
  } catch (error) {
    res.status(500).json(error('Something went wrong!', 500));
  }
};
