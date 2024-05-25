import { db } from '../../database/firebase';
import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';;
import { RSVP } from '../models/rsvp';



/**********************RSVP Query************************* */


export const createRSVPQuery = async (rsvp: RSVP) => {
    const docRef = await addDoc(collection(db, 'rsvps'), rsvp);
    updateRSVPQuery(docRef.id, { id: docRef.id });
  
    // adding a condition for the user should not accept the link multiple times
     return docRef.id;
  };
  
  export const updateRSVPQuery = async (
    id: string,
    data: object
  ): Promise<any | null> => {
    const rsvpDoc = doc(db, 'rsvps', id);
    await updateDoc(rsvpDoc, data);
    const updatedRSVP = await getDoc(rsvpDoc);
    if (!updatedRSVP.exists()) return null;
    return updatedRSVP.data() as RSVP;
  }
  
  // for getting all guests for a particular event
  /*export const getRSVPsQuery = async () => {
    const rsvps = collection(db, 'rsvps');
    const rsvpsSnapshot = await getDocs(rsvps);
    const rsvpsList: RSVP[] = [];
    rsvpsSnapshot.forEach((doc) => {
      const rsvp = doc.data() as RSVP;
      rsvpsList.push(rsvp);
    });
    return rsvpsList;
  };*/
  
  
  // getting guest list of a particular event
  export const getRSVPsQuery = async (eventId: string) => {
    const rsvps = collection(db, 'rsvps');
    const rsvpsSnapshot = await getDocs(rsvps);
    const rsvpsList: RSVP[] = [];
    rsvpsSnapshot.forEach((doc) => {
      const rsvp = doc.data() as RSVP;
      if(rsvp.eventId === eventId) rsvpsList.push(rsvp);
    });
    return rsvpsList;
  };