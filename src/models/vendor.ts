import { Timestamp } from 'firebase/firestore';
import { SERVICE } from '../shared/enum/index';

export interface Vendor {
  id: string;
  uid: string;
  name: string;
  serviceType: SERVICE;
  contact: string;
  createdAt: Timestamp;
}
