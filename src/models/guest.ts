import { Timestamp } from 'firebase/firestore';

export interface Guest {
  id: string;
  uid: string;
  name: string;
  email: string;
  phone: string;
  seats: string[],
  createdAt: Timestamp;
}
