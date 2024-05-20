import { db } from '../../database/firebase';
import { User,Event } from '../models';
// import { Event } from '../models';
import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  doc,
  getDoc
} from 'firebase/firestore';
import { SERVICE, ROLES as USER_TYPE } from '../shared/enum';
import { Vendor } from '../models/vendor';
import { Guest } from '../models/guest';


/*****************USER QUERRY ****************/


export const getUsersQuery = async () => {
  const users = collection(db, 'users');
  const usersSnapshot = await getDocs(users);
  const usersList: User[] = [];
  usersSnapshot.forEach((doc) => {
    const user = doc.data() as User;
    if (!user.deleted) usersList.push(user);
  });
  return usersList;
};

export const createUserQuery = async (user: User,serviceType: string) => {
  const docRef = await addDoc(collection(db, 'users'), user);
  updateUserQuery(docRef.id, { id: docRef.id });
  let entityObj= {};
  let entitydocRef = null;
  const typeOfUser: USER_TYPE = user.role;
  if (typeOfUser === USER_TYPE.ORGANIZER) {
    entityObj = {...user} as User
    entitydocRef = await addDoc(collection(db, 'organizers'), entityObj);
  }
  else if(typeOfUser === USER_TYPE.VENDOR) {
    entityObj = {
      uid: docRef.id,
      contact: user.mobile,
      name: user.name,
      serviceType: serviceType,
    } as Vendor;
    entitydocRef = await addDoc(collection(db, 'vendors'), entityObj);
    updateUserQuery(docRef.id, { id: entitydocRef.id });
  }
  else {
    entityObj = {
      uid: docRef.id,
      name: user.name,
      email: user.email,
      phone: user.mobile,
      createdAt: user.createdAt,
    } as Guest;
    entitydocRef = await addDoc(collection(db, 'guests'), entityObj);
    updateUserQuery(docRef.id, { id: entitydocRef.id });
  }
  return docRef.id;
};

export const getUserWithIdQuery = async (id: string): Promise<User | null> => {
  const userSnapshot = await getDoc(doc(db, 'users', id));
  if (!userSnapshot.exists()) return null;
  const user = userSnapshot.data() as User;
  if (user.deleted) return null;
  return user;
};

export const updateUserQuery = async (
  id: string,
  data: object
): Promise<User | null> => {
  const userDoc = doc(db, 'users', id);
  await updateDoc(userDoc, data);
  const updatedUser = await getDoc(userDoc);
  if (!updatedUser.exists()) return null;
  return updatedUser.data() as User;
};

export const deleteUserQuery = async (id: string) => {
  const data = { deleted: true };
  await updateUserQuery(id, data);
};


/*****************EVENT QUERRY ****************/


export const createEventQuery = async (event: Event) => {
  const docRef = await addDoc(collection(db, 'events'), event);
  return docRef.id;
};

export const getAllEventsQuery = async () => {
  const events = collection(db, 'events');
  const eventsSnapshot = await getDocs(events);
  const eventsList: Event[] = [];
  eventsSnapshot.forEach((doc) => {
    const event = doc.data() as Event;
    if (!event.deleted) eventsList.push(event);
  });
  return eventsList;
};

export const getEventByIdQuery = async (id: string): Promise<Event | null> => {
  const eventSnapshot = await getDoc(doc(db, 'events', id));
  if (!eventSnapshot.exists()) return null;
  const event = eventSnapshot.data() as Event;
  if (event.deleted) return null;
  return event;
};

export const updateEventQuery = async (
  id: string,
  data: object
): Promise<Event | null> => {
  const eventDoc = doc(db, 'events', id);
  await updateDoc(eventDoc, data);
  const updatedEvent = await getDoc(eventDoc);
  if (!updatedEvent.exists()) return null;
  return updatedEvent.data() as Event;
};

export const deleteEventQuery = async (id: string) => {
  const data = { deleted: true };
  await updateEventQuery(id, data);
}