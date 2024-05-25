import { Timestamp } from 'firebase/firestore';

export interface RSVP {
  id: string;
  name: string;
  email: string;
  phone: string;
  // guestId: string;
  eventId: string;
  createdAt: Timestamp;
}
