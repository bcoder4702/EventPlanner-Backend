import { db } from '../../database/firebase';
import { Event } from '../models';
// import { Event } from '../models';
import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import {ROLES as User_Type} from '../shared/enum/index';
import { query, where } from 'firebase/firestore'; // Import the necessary package


/********************Event Query*************************** */


export const createEventQuery = async (event: Event) => {
    const docRef = await addDoc(collection(db, 'events'), event);
    await updateEventQuery(docRef.id, { id: docRef.id });
    return docRef.id;
  };
  
  // query for vendor, guest and organizer dashboard to show all the events
      
  export const getAllEventsQuery = async (roleId: string,roleType: string) => {
    if(roleType === User_Type.VENDOR) {
      const eventsCollection = collection(db, 'events');
      const vendorQuery = query(eventsCollection, where('vendorList', 'array-contains', roleId));
      const vendorSnapshot = await getDocs(vendorQuery);
      return vendorSnapshot.docs.map(doc => doc.data());
    }
    else if(roleType === User_Type.GUEST) {
      const eventsCollection = collection(db, 'events');
      const guestEventsQuery = query(eventsCollection, where('guestList', 'array-contains', roleId));
      const guestEventsSnapshot = await getDocs(guestEventsQuery);
      return guestEventsSnapshot.docs.map(doc => doc.data());
    }
    else {
      const eventsCollection = collection(db, 'events');
      const organizerQuery = query(eventsCollection, where('organizerId', '==', roleId));
      const organizerSnapshot = await getDocs(organizerQuery);
      return organizerSnapshot.docs.map(doc => doc.data());
    }
  }
  
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