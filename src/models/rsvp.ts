import { Timestamp } from 'firebase/firestore';
import { RSVP_STATUS } from '../shared/enum/index';

export interface RSVP {
  id: string;
  guestId: string;
  eventId: string;
  status: RSVP_STATUS;
  createdAt: Timestamp;
}
