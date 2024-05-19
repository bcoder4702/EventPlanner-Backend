import { Timestamp } from 'firebase/firestore';
import { SERVICE } from '../shared/enum/index';

export interface Vendor {
  id: string;
  name: string;
  serviceType: SERVICE;
  contactInfo: string;
  createdAt: Timestamp;
}
