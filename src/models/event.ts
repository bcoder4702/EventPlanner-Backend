import { Timestamp } from 'firebase/firestore';

export interface Event {
  id: string;
  name: string;
  date: Date;
  location: string;
  description: string;
  organizerId: string;
  guestList: string[];
  vendorList: string[];
  deleted: boolean | false;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  time: Timestamp;
  theme: string;
  colortheme: string,
  venue: string;
}
