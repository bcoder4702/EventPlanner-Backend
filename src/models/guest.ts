import { Timestamp } from 'firebase/firestore';

export interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Timestamp;
}
