import { Timestamp } from 'firebase/firestore';

export interface Budget {
  id: string;
  eventId: string;
  vendorId: string;
  totalBudget: number;
  allocatedBudget: number;
  deleted: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
