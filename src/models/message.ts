import { Timestamp } from "firebase/firestore";

export interface Message {
  id: string;
  eventId: string;
  senderId: string;
  receiverId: string; // Either a user or a group
  message: string;
  timestamp: Timestamp;
}