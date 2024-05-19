import { Timestamp } from 'firebase/firestore';

export interface Venue {
  id: string;
  name: string;
  location: string;
  capacity: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
