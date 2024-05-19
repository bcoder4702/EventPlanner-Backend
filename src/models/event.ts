import { Timestamp } from "firebase/firestore";

export interface Event {
  id: string;
  name: string;
  date: Date;
  location: string;
  description: string;
  organizerId: string;
  deleted: boolean;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  time: Timestamp;
  theme: string;
  venue: string;
}