import { Timestamp } from 'firebase/firestore';
import { ROLES } from '../shared/enum/index';

export interface User {
  id: string;
  fullName: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  email: string;
  photo: string;
  role: ROLES;
  events: string[];
  deleted: boolean;
}
