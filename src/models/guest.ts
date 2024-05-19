import { Timestamp } from 'firebase/firestore';

export interface Guest {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: Timestamp;
}
