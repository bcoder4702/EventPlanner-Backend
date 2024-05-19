import { Timestamp } from 'firebase/firestore';

export interface Budget {
  id: string;
  organizerId: string;
  totalBudget: number;
  allocatedBudget: number;
  remainingBudget: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
